import { create } from 'zustand';

export type ServiceType = 'followers' | 'likes' | 'views';

export interface InstagramPost {
  id: string;
  shortCode: string;
  imageUrl: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
}

interface UpsellState {
  // Step 1: Profile
  username: string;
  avatarUrl: string;
  fullName: string;
  followersCount: number;
  posts: InstagramPost[];
  isProfileLoading: boolean;
  profileError: string | null;

  // Step 2: Service
  selectedService: ServiceType | null;
  quantity: number;
  price: number;

  // Step 3: Post selection
  selectedPostIds: string[];

  // Step 4: Checkout
  email: string;
  acceptedTerms: boolean;
  isCheckoutOpen: boolean;

  // Current step
  currentStep: number;

  // Actions
  setUsername: (username: string) => void;
  setProfile: (data: { avatarUrl: string; fullName: string; followersCount: number; posts: InstagramPost[] }) => void;
  setProfileLoading: (loading: boolean) => void;
  setProfileError: (error: string | null) => void;
  setSelectedService: (service: ServiceType) => void;
  setQuantity: (quantity: number) => void;
  setPrice: (price: number) => void;
  togglePostSelection: (postId: string) => void;
  setEmail: (email: string) => void;
  setAcceptedTerms: (accepted: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setCurrentStep: (step: number) => void;
  resetProfile: () => void;
  resetAll: () => void;

  // Computed
  calculateDistribution: () => { postId: string; amount: number }[];
  isDistributable: () => boolean;
}

const useUpsellStore = create<UpsellState>((set, get) => ({
  // State
  username: '',
  avatarUrl: '',
  fullName: '',
  followersCount: 0,
  posts: [],
  isProfileLoading: false,
  profileError: null,
  selectedService: null,
  quantity: 100,
  price: 2.49,
  selectedPostIds: [],
  email: '',
  acceptedTerms: false,
  isCheckoutOpen: false,
  currentStep: 1,

  // Actions
  setUsername: (username) => set({ username }),
  setProfile: (data) => set({
    avatarUrl: data.avatarUrl,
    fullName: data.fullName,
    followersCount: data.followersCount,
    posts: data.posts,
    currentStep: 2,
    profileError: null,
  }),
  setProfileLoading: (loading) => set({ isProfileLoading: loading }),
  setProfileError: (error) => set({ profileError: error }),
  setSelectedService: (service) => set({
    selectedService: service,
    selectedPostIds: [],
    currentStep: service === 'followers' ? 4 : 3,
  }),
  setQuantity: (quantity) => set({ quantity }),
  setPrice: (price) => set({ price }),
  togglePostSelection: (postId) => set((state) => {
    const exists = state.selectedPostIds.includes(postId);
    return {
      selectedPostIds: exists
        ? state.selectedPostIds.filter((id) => id !== postId)
        : [...state.selectedPostIds, postId],
    };
  }),
  setEmail: (email) => set({ email }),
  setAcceptedTerms: (accepted) => set({ acceptedTerms: accepted }),
  setIsCheckoutOpen: (open) => set({ isCheckoutOpen: open }),
  setCurrentStep: (step) => set({ currentStep: step }),
  resetProfile: () => set({
    username: '',
    avatarUrl: '',
    fullName: '',
    followersCount: 0,
    posts: [],
    selectedService: null,
    quantity: 100,
    price: 2.49,
    selectedPostIds: [],
    currentStep: 1,
    profileError: null,
  }),
  resetAll: () => set({
    username: '',
    avatarUrl: '',
    fullName: '',
    followersCount: 0,
    posts: [],
    isProfileLoading: false,
    profileError: null,
    selectedService: null,
    quantity: 100,
    price: 2.49,
    selectedPostIds: [],
    email: '',
    acceptedTerms: false,
    isCheckoutOpen: false,
    currentStep: 1,
  }),

  // Computed
  calculateDistribution: () => {
    const { selectedPostIds, quantity } = get();
    if (selectedPostIds.length === 0) return [];

    const base = Math.floor(quantity / selectedPostIds.length);
    const remainder = quantity % selectedPostIds.length;

    return selectedPostIds.map((postId, index) => ({
      postId,
      amount: base + (index < remainder ? 1 : 0),
    }));
  },

  isDistributable: () => {
    const { selectedService } = get();
    return selectedService === 'likes' || selectedService === 'views';
  },
}));

export default useUpsellStore;
