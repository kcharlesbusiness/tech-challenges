export default {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/assets/scss/main.scss";
                `,
            },
        },
    },
};
