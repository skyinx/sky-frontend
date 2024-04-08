export const apiList = {
  common: (module) => ({
    list: {
      url: () => `${module}/list`,
    },
    create: {
      url: () => `${module}/create`,
    },
    get: {
      url: (id) => `${module}/${id}`,
    },
    update: {
      url: (id) => `${module}/update/${id}`,
    },
    delete: {
      url: (id) => `${module}/delete/${id}`,
    },
  }),
};
