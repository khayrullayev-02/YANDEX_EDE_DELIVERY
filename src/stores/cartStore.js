import { create } from "zustand"
import { persist } from "zustand/middleware"

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      deliveryFee: 5.99,

      addItem: (item) => {
        const { items } = get()
        const existingItem = items.find((i) => i.id === item.id)

        if (existingItem) {
          set((state) => ({
            items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
          }))
        } else {
          set((state) => ({
            items: [...state.items, { ...item, quantity: 1 }],
          }))
        }

        get().calculateTotal()
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }))
        get().calculateTotal()
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        set((state) => ({
          items: state.items.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
        }))
        get().calculateTotal()
      },

      clearCart: () => {
        set({ items: [], total: 0 })
      },

      calculateTotal: () => {
        const { items } = get()
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        set({ total: subtotal })
      },

      getItemCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.quantity, 0)
      },

      getTotalWithDelivery: () => {
        const { total, deliveryFee } = get()
        return total + deliveryFee
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)

export default useCartStore
