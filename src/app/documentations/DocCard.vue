<!-- DocCard.vue -->
<script setup lang="ts">
import { Documentation, type IDocumentation } from '~/database/models/Documentation';
import { useDocumentations } from '~/shared/states/documentationsState';
import { useConfirm } from "primevue/useconfirm";
import EditDocsModal from './EditDocsModal.vue';
// import ContextMenu from 'primevue/contextmenu'; // Comentar
// import { MenuItem } from 'primevue/menuitem'; // Comentar
import DocPrototype from '~/shared/components/DocPrototype.vue';
import { Status } from '~/@types/status';

const props = defineProps<{ data: IDocumentation }>();
const docs = useDocumentations();
const confirm = useConfirm();

const editMenuIsOpen = ref(false);
const isOpening = ref(false);

// const contextMenuRef = ref(); // Comentar
// const contextMenuItems = ref<MenuItem[]>([ // Comentar
//   {
//     label: $t('documentations.documentations-list-item-contextmenu-edit-message'),
//     command: (ev) => {
//       openEditDocModal();
//     }
//   },
//   {
//     label: $t('documentations.documentations-list-item-contextmenu-delete-message'),
//     class: '[&_span]:!text-[#d4373c] [&_div]:hover:!bg-[#f99999]/10',
//     command: deleteConfirmDialog
//   }
// ]);

function openEditDocModal() {
  editMenuIsOpen.value = true;
}

function closeEditModal() {
  editMenuIsOpen.value = false;
}

function deleteConfirmDialog() {
  confirm.require({
    header: $t('documentations.delete-doc-dialog-title'),
    message: $t('documentations.delete-doc-dialog-message'),
    acceptClass: '!w-32 !h-11 !font-normal !bg-[#c22d37] hover:!bg-[#992028] ml-2.5 border-0',
    rejectClass: '!w-32 !h-11 !font-normal',
    acceptLabel: $t('documentations.delete-doc-dialog-confirm-button-message'),
    rejectLabel: $t('documentations.delete-doc-dialog-cancel-button-message'),
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
</script>

<template>
  <div>
    <!-- Comentar o ContextMenu -->
    <!-- <ContextMenu :model="contextMenuItems" ref="contextMenuRef" /> -->
    <EditDocsModal v-if="editMenuIsOpen" @close="closeEditModal" :data="props.data" />
    <!-- Resto do template -->
  </div>
</template>