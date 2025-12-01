import {setGlobalOptions} from "firebase-functions";
import {onRequest} from "firebase-functions/https";
import {initializeApp} from "firebase-admin/app";
import {getFirestore, FieldValue} from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";

setGlobalOptions({maxInstances: 10});
initializeApp();

export const createNotification = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({error: "Méthode non autorisée"});
    return;
  }

  const {title, message} = req.body ?? {};
  if (!title || !message) {
    res.status(400).send({error: "title et message sont requis"});
    return;
  }

  try {
    const db = getFirestore();
    await db
      .collection("notifications")
      .add({
        title,
        message,
        read: false,
        createdAt: FieldValue.serverTimestamp(),
      });

    res.status(201).send({success: true});
    return;
  } catch (err) {
    logger.error("createNotification error", err);
    res.status(500).send({
      error: "Erreur lors de la création de la notification",
    });
    return;
  }
});
