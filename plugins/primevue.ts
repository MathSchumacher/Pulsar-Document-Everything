import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import ConfirmationService from 'primevue/confirmationservice';

// PrimeVue Passthrough configuration for unstyled mode with Tailwind classes
const pt = {
  dropdown: {
    root: 'relative inline-flex cursor-pointer select-none border-0 group bg-secondary/60 hover:bg-secondary/80 shadow rounded-lg',
    input: 'flex items-center h-11 text-primary/80 bg-transparent group-hover:bg-secondary border-0 duration-300 px-4',
    trigger: 'flex items-center justify-center w-10 bg-transparent group-hover:bg-secondary duration-300',
    wrapper: 'absolute mt-2.5 px-5 py-2.5 bg-secondary/90 backdrop-blur-lg rounded-[13px] shadow-lg z-50',
    list: 'flex flex-col gap-2 text-primary/80 p-0 m-0',
    item: ({ context }: any) => ({
      class: `
        h-[45px]
        flex
        items-center
        px-4
        cursor-pointer
        ${context.selected ? 'bg-primary hover:bg-primary/80' : 'hover:bg-primary/20'}
        rounded-md
        text-primary
        hover:text-primary/80
        duration-300
      `
    })
  },
  toolbar: {
    root: 'flex items-center justify-between bg-secondary/60 backdrop-blur-lg border-0 px-9 py-4 shadow rounded-lg'
  },
  inputtext: {
    root: 'w-full h-10 px-4 bg-secondary/10 border border-primary/30 text-primary/80 placeholder:text-primary/30 focus:border-primary/50 focus:shadow-none focus:outline-none duration-300 rounded-lg'
  },
  button: {
    root: ({ props }: any) => ({
      class: `
        inline-flex
        justify-center
        items-center
        cursor-pointer
        select-none
        ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
        bg-secondary/10
        hover:bg-primary/80
        p-2
        border
        border-primary/30
        focus:shadow-none
        focus:outline-none
        rounded-lg
        text-primary/90
        duration-300
      `
    }),
    label: 'font-normal',
    icon: 'mr-2'
  },
  textarea: {
    root: 'w-full max-h-[130px] px-4 py-3 rounded-md bg-secondary/10 text-primary/80 placeholder:text-primary/30 border border-primary/30 focus:border-primary/50 focus:shadow-none focus:outline-none duration-300'
  },
  scrollpanel: {
    root: 'w-full overflow-hidden',
    wrapper: 'overflow-auto w-full h-full',
    content: 'w-full',
    barX: 'hidden',
    barY: 'w-1 bg-secondary/30 rounded hover:bg-primary/50 duration-300'
  },
  inputswitch: {
    root: ({ props }: any) => ({
      class: `relative inline-block w-12 h-7 cursor-pointer rounded-full duration-300 ${props.modelValue ? 'bg-primary' : 'bg-[#404040]'}`
    }),
    slider: ({ props }: any) => ({
      class: `absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow duration-300 ${props.modelValue ? 'translate-x-5' : ''}`
    }),
    input: 'absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer z-10'
  },
  colorpicker: {
    input: 'w-10 h-10 rounded cursor-pointer border-2 border-primary/30 hover:border-primary/80',
    panel: 'z-[9999] rounded bg-secondary shadow-lg p-4',
    content: 'rounded',
    selector: 'rounded',
    color: 'rounded',
    hue: 'rounded',
    hueHandle: 'w-3 h-3 rounded-full bg-white shadow'
  },
  paginator: {
    root: 'flex items-center justify-center gap-2 bg-transparent border-0 py-4',
    firstPageButton: 'p-2 rounded hover:bg-primary/20 duration-300',
    prevPageButton: 'p-2 rounded hover:bg-primary/20 duration-300',
    nextPageButton: 'p-2 rounded hover:bg-primary/20 duration-300',
    lastPageButton: 'p-2 rounded hover:bg-primary/20 duration-300',
    pageButton: ({ context }: any) => ({
      class: `w-10 h-10 rounded flex items-center justify-center duration-300 ${context.active ? 'bg-primary text-white' : 'bg-transparent hover:bg-primary/20'}`
    })
  },
  confirmdialog: {
    root: 'bg-secondary rounded-lg shadow-2xl',
    header: 'flex items-center justify-between p-6 text-primary border-b border-divider',
    title: 'text-xl font-medium',
    content: 'p-6 text-primary/80',
    footer: 'flex justify-end gap-3 p-6 border-t border-divider'
  },
  contextmenu: {
    root: 'bg-secondary rounded-lg shadow-lg py-2 min-w-[150px]',
    menu: 'list-none p-0 m-0',
    menuitem: 'px-4 py-2 cursor-pointer hover:bg-primary/20 duration-300',
    content: 'flex items-center gap-2',
    label: 'text-primary/80 font-medium'
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { 
    unstyled: true,
    ripple: true,
    pt
  });

  nuxtApp.vueApp.use(ConfirmationService);
  nuxtApp.vueApp.component('Button', Button);
});
