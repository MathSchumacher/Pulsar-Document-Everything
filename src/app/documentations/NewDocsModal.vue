<script setup lang="ts">
import { Documentation, documentationDataEmptyObj, IDocumentation, IDocumentationColorPalette } from '~/database/models/Documentation';
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import ScrollPanel from 'primevue/scrollpanel';
import InputSwitch from 'primevue/inputswitch';
import ColorPicker from 'primevue/colorpicker';
import DocPrototype from '~/shared/components/DocPrototype.vue';
import { useDocumentations } from '~/shared/states/documentationsState';
import { Status } from '~/@types/status';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const docs = useDocumentations();

const defaultColors: IDocumentationColorPalette = {
  background: '#0a0a14',
  primary: '#7665d7',
  secondary: '#18182e',
  text: '#d3d3d3',
  divider: '#2b304a',
  codeBlockText: '#d3d3d3',
  codeBlockVariable: '#F98181',
  codeBlockLiteral: '#db6f3d',
  codeBlockKeyword: '#9e5fd9',
  codeBlockString: '#B9F18D',
  codeBlockSection: '#70c25b',
  codeBlockComments: '#616161',
};

const formData = ref<Pick<IDocumentation, 'title' | 'description' | 'features' | 'colors'>>({
  title: '',
  description: '',
  features: {
    indexesTable: true,
    autoSave: true
  },
  colors: { ...defaultColors }
});

const handleDocCreate = async () => {
  const newDocPayload: IDocumentation = {
    ...JSON.parse(JSON.stringify(documentationDataEmptyObj)),
    ...JSON.parse(JSON.stringify(formData.value)),
    createdAt: Date.now()
  };

  const result = await Documentation.create(newDocPayload);

  if(result === Status.OK) {
    // Reload docs list
    const allDocs = await Documentation.getAll();
    docs.value.data = allDocs;
    handleCloseModal();
  } else {
    alert('Error on creating documentation!');
  }
};

const handleCloseModal = () => {
  docs.value.newDocsModalIsOpen = false;
  // Reset form data
  formData.value = {
    title: '',
    description: '',
    features: {
      indexesTable: true,
      autoSave: true
    },
    colors: { ...defaultColors }
  };
};
</script>

<template>
  <div :class="`${docs.newDocsModalIsOpen? 'opacity-1' : 'opacity-0 pointer-events-none'} duration-300 fixed left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 flex max-xl:flex-col min-w-full xl:min-w-[400px] h-full xl:h-[550px] bg-secondary xl:rounded-lg max-xl:overflow-scroll z-[91]`">
    <!--Doc prototype-->
    <div class="flex justify-center items-center w-full xl:w-[400px] max-xl:py-8 bg-secondary_darken h-full rounded-l-lg">
      <DocPrototype
        :colors="formData.colors"
        :features="formData.features"
        navbar
      />
    </div>
    <!--Form-->
    <div class="w-full xl:w-[450px] p-10">
      <h2 class="text-primary/80 text-xl font-medium">{{ t('documentations.new-doc-modal-title') }}</h2>
      <hr class="w-full h-px bg-divider border-none mt-5" />
      <ScrollPanel 
        class="relative w-full h-[calc(100%-10px)]"
        :pt="{
          barY: 'max-xl:hidden ml-10 !bg-secondary/30 contrast-200'
        }"
      >
        <form @submit.prevent="handleDocCreate()" class="relative w-full h-full flex flex-col">
          <!--Title input-->
          <div class="w-full flex flex-col gap-2 mt-5">
            <label class="text-md text-primary/70 font-medium">{{ t('documentations.new-doc-modal-title-input-label') }}</label>
            <InputText
              v-model="formData.title"
              class="rounded-md !h-11 contrast-200 !border-secondary/60"
              :placeholder="t('documentations.new-doc-modal-title-input-placeholder')"
              required
            />
          </div>
          <!--Description input-->
          <div class="w-full flex flex-col gap-2 mt-5">
            <label class="text-md text-primary/70 font-medium">{{ t('documentations.new-doc-modal-description-input-label') }}</label>
            <TextArea
              v-model="formData.description"
              class="!border-secondary/60 contrast-200 max-h-[74px]"
              :placeholder="t('documentations.new-doc-modal-description-input-placeholder')"
              required
            />
          </div>
          <!--Indexes table-->
          <div class="w-full flex justify-between gap-2 mt-7">
            <label class="text-md text-primary/70 font-medium">{{ t('documentations.new-doc-modal-indexestable-input-label') }}</label>
            <InputSwitch v-model="formData.features.indexesTable"/>
          </div>
          <!--Colors section-->
          <div class="w-full flex flex-col gap-4 mt-7">
            <h3 class="text-md text-primary/70 font-medium">{{ t('documentations.new-doc-modal-colors-area-title') }}</h3>
            <div class="flex flex-wrap gap-3">
              <div class="flex flex-col gap-1.5">
                <label class="text-sm text-primary/50">Background</label>
                <ColorPicker v-model="formData.colors.background" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-sm text-primary/50">Primary</label>
                <ColorPicker v-model="formData.colors.primary" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-sm text-primary/50">Secondary</label>
                <ColorPicker v-model="formData.colors.secondary" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-sm text-primary/50">Text</label>
                <ColorPicker v-model="formData.colors.text" />
              </div>
            </div>
          </div>
          <!--Cancel and submit buttons-->
          <div class="flex flex-wrap gap-2.5 mt-10 xl:pb-10 self-end">
            <Button @click="handleCloseModal" type="button" class="!w-[140px] !h-[45px] !bg-secondary/10 contrast-200 hover:!bg-secondary/40">
              {{ t('documentations.new-doc-modal-cancel-button-message') }}
            </Button>
            <Button type="submit" class="!w-[140px] !h-11 !bg-primary hover:!bg-primary/50">
              {{ t('documentations.new-doc-modal-create-button-message') }}
            </Button>
          </div>
        </form>
      </ScrollPanel>
    </div>
  </div>
  <!--Modal backdrop-->
  <div 
    @click="handleCloseModal"
    :class="`fixed left-0 top-0 w-screen h-screen bg-[#00000090] z-[90] duration-300 ${docs.newDocsModalIsOpen? 'opacity-1' : 'opacity-0 pointer-events-none'}`"
  ></div>
</template>