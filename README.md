# **React Query Darslari**

## **1-Dars Kutubxonani o'rnatish va sozlash**

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

---

## **2-Dars useQuery Hook**

`useQuery` – komponent ichida serverdan ma'lumot olish uchun ishlatiladi. U ma'lumotni olib keladi, keshga saqlaydi va avtomatik ravishda yangilaydi. Shu bilan birga, yuklanish (loading) va xatolik (error) holatlarini ham boshqaradi.

```tsx
import { useQuery } from "@tanstack/react-query";

export default function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
  });

  if (error) return <div>There was an error</div>;
  if (isLoading) return <div>Data is loading...</div>;

  return (
    <div>
      {data.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.id}</h2>
          <h1>{todo.title}</h1>
        </div>
      ))}
    </div>
  );
}
```

- `queryKey: ["todo"]`
  - Bu kesh nomi — React Query ushbu nom asosida ma’lumotni saqlaydi va boshqaradi.
- `queryFn: () => fetch(...).then(res => res.json())`
  - Bu ma’lumotni olish funksiyasi. `fetch` orqali `https://jsonplaceholder.typicode.com/todos` API'dan ma'lumot olinadi.
- `useQuery qaytaradi:`

  - `data`: API'dan olingan ma’lumot (bu yerda todos array).
  - `error`: Agar xatolik bo‘lsa, shu yerda bo‘ladi.
  - `isLoading`: Ma'lumot yuklanayotgan paytda true bo‘ladi.

- `if (error) return <div>There was an error</div>;`
  - xatolik bo‘lsa — “There was an error” chiqadi,
- `if (isLoading) return <div>Data is loading...</div>;`
  - ma'lumot yuklanayotgan bo‘lsa — “Data is loading…” chiqadi.

---

## **2-Dars useMutation Hook**

`useMutation` - hooki React Query'da ma'lumot yuborish (`POST, PUT, DELETE`) kabi `"write"` (yozish) amallarini bajarish uchun ishlatiladi.
Bu hook orqali foydalanuvchi formani yuborganda yoki ma'lumot o'zgartirganda serverga so'rov jo‘natiladi.
`useMutation` natijasida so‘rov holati (`loading, success, error`) kuzatiladi va UI’da shu holatlarga mos o‘zgarishlar ko‘rsatiladi.
Shuningdek, muvaffaqiyatli so‘rovdan keyin `onSuccess` funksiyasi orqali kerakli qadamlarni (masalan, cache’ni yangilash yoki sahifani o‘zgartirish) bajarish mumkin.

```tsx
const { mutate, isPending, isError, isSuccess } = useMutation({
  mutationFn: (newPost) =>
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json()),
});

if (isError) return <div>There was an error</div>;

{
  isPending && <p>Data is pending</p>;
}
<button
  onClick={() =>
    mutate({
      userId: 1,
      id: 500000,
      title: "Muhriddi title",
      body: "Muhriddin description",
    })
  }
>
  Add
</button>;
```

- `mutationFn` – bu POST so‘rovni bajaruvchi funksiya.
- `newPost` – foydalanuvchidan keladigan yangi post ma’lumoti (masalan: title, body).
- `fetch(...)` – bu ma'lumotni serverga jo‘natish.
- `then((res) => res.json())` – javobni JSON formatga o‘girish.

- `mutate` – POST so‘rovni ishga tushiruvchi funksiya (ya’ni tugma bosilganda chaqiriladi).
- `isPending` – so‘rov bajarilayotgan vaqt.
- `isError` – xatolik yuz bersa true bo‘ladi.
- `isSuccess` – so‘rov muvaffaqiyatli bo‘lsa true bo‘ladi.
