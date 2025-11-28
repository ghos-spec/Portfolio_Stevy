<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
    <!-- Test des couleurs et typographie -->
    <div class="max-w-4xl mx-auto space-y-8">
      <div class="bg-white rounded-lg shadow-2xl p-6">
        <h1 class="text-5xl font-extrabold text-gray-900 mb-2">
          Tailwind CSS fonctionne ! ✔️
        </h1>
        <p class="text-lg text-gray-600">
          Test complet des fonctionnalités Tailwind CSS v4
        </p>
      </div>

      <!-- Test des couleurs -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-blue-500 text-white p-4 rounded-lg text-center font-semibold">
          Blue
        </div>
        <div class="bg-green-500 text-white p-4 rounded-lg text-center font-semibold">
          Green
        </div>
        <div class="bg-red-500 text-white p-4 rounded-lg text-center font-semibold">
          Red
        </div>
        <div class="bg-yellow-500 text-white p-4 rounded-lg text-center font-semibold">
          Yellow
        </div>
      </div>

      <!-- Test des effets et transitions -->
      <div class="bg-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
        <h2 class="text-2xl font-bold mb-2">Effets au survol</h2>
        <p class="text-purple-100">Survolez cette carte pour voir les transitions</p>
      </div>

      <!-- Test responsive et flexbox -->
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 bg-indigo-500 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-2">Colonne 1</h3>
          <p class="text-indigo-100">Responsive flexbox</p>
        </div>
        <div class="flex-1 bg-pink-500 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-2">Colonne 2</h3>
          <p class="text-pink-100">Layout adaptatif</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import '~/assets/css/main.css';
</style>
