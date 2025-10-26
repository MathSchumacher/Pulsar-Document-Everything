<script setup lang="ts">
import AppIcon from '~/shared/components/icons/AppIcon.vue';
import Dropdown from 'primevue/dropdown';
import MobileMenu from './MobileMenu.vue';
import DonateMenu from './DonateMenu.vue';
import { useNavbar } from '~/shared/states/navbarState';
import { useI18n } from 'vue-i18n';

const navbar = useNavbar();
const { t, locale, setLocale, locales } = useI18n();

// Timer local (não no estado)
let copiedTimer: NodeJS.Timeout | undefined;

// Sincroniza selectedLocale com vue-i18n
watch(() => navbar.value.selectedLocale, (newLocale) => {
  if (newLocale && ['en', 'pt'].includes(newLocale)) {
    setLocale(newLocale as 'en' | 'pt');
  }
});

// Inicializa selectedLocale com locale atual
onMounted(() => {
  navbar.value.selectedLocale = locale.value as 'en' | 'pt';
});

// Funções de menu
function openMobileMenu() {
  navbar.value.mobileMenuIsOpen = true;
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  navbar.value.mobileMenuIsOpen = false;
  document.body.style.overflow = 'auto';
}

function copyPix() {
  navigator.clipboard.writeText('03752835010');
  navbar.value.donateMenu.isCopiedPix = true;

  // Limpa o timer anterior se existir
  if (copiedTimer) clearTimeout(copiedTimer);
  
  // Armazena o timer localmente, não no estado
  copiedTimer = setTimeout(() => {
    navbar.value.donateMenu.isCopiedPix = false;
  }, 1500);
}

// Limpa o timer ao desmontar o componente
onUnmounted(() => {
  if (copiedTimer) {
    clearTimeout(copiedTimer);
  }
});
</script>

<template>
  <!-- Resto do template permanece igual -->
  <nav class="relative w-full flex-col px-7 3xl:px-32 xl:px-14 md:px-12 py-10 z-[80]">
    <div class="w-full flex items-center justify-between">
      <AppIcon class="min-w-[40px]" size="40" color="#d3d3d3" />

      <!-- Menu Desktop -->
      <div class="hidden xl:flex items-center px-7 h-11 bg-secondary/10 rounded-[10px] border border-solid border-primary/20">
        <ul class="flex items-center gap-7">
          <li>
            <NuxtLinkLocale to="/" class="text-primary/80 hover:text-secondary/90 duration-300 font-normal">
              {{ t('navbar.links-home') }}
            </NuxtLinkLocale>
          </li>
          <li>
            <a href="https://github.com/MathSchumacher/Pulsar-Document-Everything"
               target="_blank" rel="noreferrer"
               class="text-primary/80 hover:text-secondary/90 duration-300 font-normal">
               {{ t('navbar.links-documentations') }}
            </a>
          </li>
          <li>
            <a href="https://github.com/MathSchumacher/Pulsar-Document-Everything"
               target="_blank" rel="noreferrer"
               class="text-primary/80 hover:text-secondary/90 duration-300 font-normal">
               Github
            </a>
          </li>
          <li>
            <div class="flex flex-col">
              <button @click="navbar.donateMenu.isOpen = true" class="text-primary/80 hover:text-secondary/90 duration-300">
                {{ t('navbar.links-donate') }}
              </button>
              <DonateMenu />
            </div>
          </li>
        </ul>
      </div>

      <!-- Idiomas e botão "Get Started" -->
      <div class="hidden xl:flex items-center gap-2.5">
        <Dropdown
          class="max-w-[170px] 2xl:max-w-[180px] !h-11 !rounded-[10px] !px-2"
          v-model="navbar.selectedLocale"
          :options="locales"
          optionLabel="name"
          optionValue="code"
          :placeholder="locale"
        />
        <NuxtLinkLocale
          to="/documentations"
          :class="`${$route.path.match('/documentations') ? 'hidden' : 'flex'} items-center justify-center w-[150px] 2xl:w-[160px] h-11 text-primary font-normal bg-primary/80 hover:bg-primary/60 hover:text-primary/90 duration-300 border-none rounded-[10px]`">
          {{ t('navbar.getting-started-button') }}
        </NuxtLinkLocale>
      </div>

      <MobileMenu />
    </div>

    <hr class="radial-separator mt-7" />
  </nav>
</template>

<style scoped>
.radial-separator {
  width: 100%;
  height: 1px;
  border: none;
  background: rgb(25,29,43);
  background: radial-gradient(circle, rgba(25,29,43,1) 43%, rgba(15,17,27,1) 100%);
}
</style>