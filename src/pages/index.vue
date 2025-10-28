<script setup lang="ts">
import { useI18n } from 'vue-i18n'; // ✅ Adicionado
import Header from '~/app/home/Header.vue';
import FeaturesCards from '~/app/home/FeaturesCards.vue';
import MainFeatures from '~/app/home/MainFeatures.vue';
import Customizations from '~/app/home/Customizations.vue';
import GettingStarted from '~/app/home/GettingStarted.vue';
import Footer from '~/app/home/Footer.vue';

const { t } = useI18n(); // ✅ Adicionado
</script>

<template>
  <Head>
    <Title>{{ t('home.title') }}</Title>
  </Head>
  <div class="flex flex-col">
    <Header />
    <FeaturesCards />
    <MainFeatures />
    <Customizations />
    <GettingStarted />
    <Footer />
  </div>
</template>