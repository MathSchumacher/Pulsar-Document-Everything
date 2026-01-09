<!-- DocCard.vue -->
<script setup lang="ts">
import { Documentation, type IDocumentation } from '~/database/models/Documentation';
import { useDocumentations } from '~/shared/states/documentationsState';
import { useConfirm } from "primevue/useconfirm";
import EditDocsModal from './EditDocsModal.vue';
import DocPrototype from '~/shared/components/DocPrototype.vue';
import { Status } from '~/@types/status';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps<{ data: IDocumentation }>();
const docs = useDocumentations();
const confirm = useConfirm();
const router = useRouter();

const editMenuIsOpen = ref(false);
const isOpening = ref(false);

function openEditDocModal() {
  editMenuIsOpen.value = true;
}

function closeEditModal() {
  editMenuIsOpen.value = false;
}

function deleteConfirmDialog() {
  confirm.require({
    header: t('documentations.delete-doc-dialog-title'),
    message: t('documentations.delete-doc-dialog-message'),
    acceptClass: '!w-32 !h-11 !font-normal !bg-[#c22d37] hover:!bg-[#992028] ml-2.5 border-0',
    rejectClass: '!w-32 !h-11 !font-normal',
    acceptLabel: t('documentations.delete-doc-dialog-confirm-button-message'),
    rejectLabel: t('documentations.delete-doc-dialog-cancel-button-message'),
    accept: async () => {
      const result = await Documentation.delete(props.data.id);

      if(result === Status.OK) {
        const updatedData = docs.value.data.filter(doc => doc.id !== props.data.id);
        docs.value.data = updatedData;
      } else {
        alert('An error occurred on trying to delete the documentation!');
      }
    }
  });
}

async function openDocumentation() {
  isOpening.value = true;
  await router.push(`/editor/${props.data.id}`);
}
</script>

<template>
  <div class="relative group grow">
    <!--Edit Modal-->
    <EditDocsModal 
      v-if="editMenuIsOpen" 
      :doc-id="props.data.id"
      :is-open="editMenuIsOpen"
      @close-modal="closeEditModal" 
    />
    
    <!--Card-->
    <div 
      @click="openDocumentation"
      :class="`
        relative
        flex
        flex-col
        w-full
        xl:min-w-[350px]
        xl:max-w-[400px]
        min-h-[280px]
        bg-secondary/60
        hover:bg-secondary/80
        rounded-xl
        border
        border-primary/20
        hover:border-primary/40
        overflow-hidden
        cursor-pointer
        duration-300
        ${isOpening && 'pointer-events-none'}
      `"
    >
      <!--Loading overlay-->
      <div 
        v-if="isOpening" 
        class="absolute inset-0 flex flex-col justify-center items-center gap-3 bg-secondary/90 z-10"
      >
        <font-awesome-icon icon="fa-solid fa-circle-notch" class="text-[30px] text-primary" spin></font-awesome-icon>
        <p class="text-sm text-primary/60">{{ t('documentations.doc-card-loading-message') }}</p>
      </div>

      <!--Doc preview-->
      <div class="flex justify-center items-center py-6 px-4 bg-secondary_darken/50">
        <DocPrototype
          :colors="props.data.colors"
          :features="props.data.features"
          class="scale-75"
        />
      </div>

      <!--Doc info-->
      <div class="flex flex-col gap-2 p-5">
        <h3 class="text-lg text-primary/90 font-medium truncate">
          {{ props.data.title || 'Untitled Documentation' }}
        </h3>
        <p class="text-sm text-primary/50 line-clamp-2 min-h-[40px]">
          {{ props.data.description || 'No description provided' }}
        </p>
        
        <!--Stats-->
        <div class="flex items-center gap-4 mt-2 text-xs text-primary/40">
          <span class="flex items-center gap-1.5">
            <font-awesome-icon icon="fa-solid fa-file-lines" />
            {{ props.data.pages?.length || 0 }} pages
          </span>
          <span class="flex items-center gap-1.5">
            <font-awesome-icon icon="fa-solid fa-folder" />
            {{ props.data.categories?.length || 0 }} categories
          </span>
        </div>
      </div>

      <!--Action buttons (visible on hover)-->
      <div 
        class="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 duration-300"
        @click.stop
      >
        <Button 
          @click="openEditDocModal"
          class="!w-9 !h-9 !bg-primary/80 hover:!bg-primary !border-none"
          :aria-label="t('documentations.documentations-list-item-contextmenu-edit-message')"
        >
          <font-awesome-icon icon="fa-solid fa-pen" class="text-sm" />
        </Button>
        <Button 
          @click="deleteConfirmDialog"
          class="!w-9 !h-9 !bg-[#c22d37]/80 hover:!bg-[#c22d37] !border-none"
          :aria-label="t('documentations.documentations-list-item-contextmenu-delete-message')"
        >
          <font-awesome-icon icon="fa-solid fa-trash" class="text-sm" />
        </Button>
      </div>
    </div>
  </div>
</template>