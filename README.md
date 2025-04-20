# **React Query Darslari**

## **1-Dars**

`React Query` — frontend va backend o‘rtasidagi ma’lumotlar bilan ishlashni boshqarish uchun yaratilgan kutubxona. Bu orqali API'dan ma’lumotlarni olish, yangilash, o‘chirish kabi ishlarni avtomatik tarzda bajarish osonlashadi.

**Nima uchun ishlatiladi?**

- Ma’lumotlarni keshlash (cache): Bir marta olingan ma’lumotni React Query xotirada saqlaydi, shuning uchun keyingi safar shu ma’lumot kerak bo‘lsa, API'ga qayta so‘rov yuborilmaydi.

- Avtomatik yangilanish (refetching): Ma’lumotlar o‘zgarishi mumkin bo‘lgan holatlarda, React Query ularni avtomatik yangilab turadi.

- Loading, error va success holatlarini boshqarish oson: Har bir API chaqiruvi uchun loading, error va success holatlari bilan alohida shug‘ullanish shart emas — React Query bularni avtomatik qiladi.

- Backgroundda ma’lumotlarni sinxronlashtirish: React Query sahifani yangilamasdan ma’lumotni server bilan moslashtirib turadi.

- Server-state management: Redux yoki Context API bilan frontendda ishlaydigan client state boshqariladi. React Query esa serverdan keladigan ma’lumotlar (ya'ni server state) bilan ishlash uchun eng yaxshi vositalardan biridir.

```bash
npm install @tanstack/react-query
```

- Ract Queryni o'rnatish

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({});

<StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
</StrictMode>;
```

- `QueryClient`: Bu — React Query uchun konfiguratsiya (sozlamalar) saqlovchi obyekt.
- `QueryClientProvider`: Bu — React kontekst provayderi bo‘lib, butun ilovaga React Query’ni "taqdim etadi".
