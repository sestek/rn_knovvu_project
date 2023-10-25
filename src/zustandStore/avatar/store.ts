import create from 'zustand';

const useModalCloseAvatarStore = create(set => ({
  isModalAvatarOpen: true,
  setIsModalAvatarOpen: (newState: any) => set({isModalAvatarOpen: newState}),
}));

export default useModalCloseAvatarStore;
