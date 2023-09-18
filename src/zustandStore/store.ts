import create from 'zustand';

const useModalCloseStore = create(set => ({
  isModalOpen: true,
  setIsModalOpen: (newState: any) => set({isModalOpen: newState}),
}));

export default useModalCloseStore;
