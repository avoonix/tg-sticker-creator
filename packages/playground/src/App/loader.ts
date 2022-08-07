import { onMounted } from "vue";

export const showFullscreenLoader = () => {
  document
    .querySelector(".fullscreen-loader-container")
    ?.classList.remove("hide-loader");
};

export const hideFullscreenLoader = () => {
  document
    .querySelector(".fullscreen-loader-container")
    ?.classList.add("hide-loader");
};

export const hideFullscreenLoaderOnMount = () => {
  onMounted(() => hideFullscreenLoader());
};
