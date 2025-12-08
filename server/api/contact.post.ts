import { getFirestoreAdmin } from '../utils/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

interface ContactBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event);

  // Validation
  if (!body.name || !body.email || !body.subject || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tous les champs sont requis'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Adresse email invalide'
    });
  }

  // Subject mapping
  const subjectLabels: Record<string, string> = {
    project: 'Nouveau projet',
    collaboration: 'Collaboration',
    job: 'Opportunité d\'emploi',
    other: 'Autre'
  };

  try {
    const db = getFirestoreAdmin();
    
    const messageData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      subject: subjectLabels[body.subject] || body.subject,
      subjectKey: body.subject,
      message: body.message.trim(),
      createdAt: FieldValue.serverTimestamp(),
      unread: true,
      archived: false,
      source: 'contact-form'
    };

    const docRef = await db.collection('messages').add(messageData);

    await db.collection('notifications').add({
      title: `Nouveau message de ${messageData.name}`,
      message: messageData.subject || 'Nouveau message reçu',
      read: false,
      createdAt: FieldValue.serverTimestamp(),
      type: 'message',
      messageId: docRef.id
    });

    return {
      success: true,
      messageId: docRef.id,
      message: 'Votre message a été envoyé avec succès !'
    };
  } catch (error: any) {
    console.error('[API/contact] Error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
    });
  }
});
