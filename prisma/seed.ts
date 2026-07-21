import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const branches = [
  {
    number: "01",
    nameAr: "فرع وسط البلد",
    nameEn: "Downtown Branch",
    addressAr: "شارع مُصطفى النحاس، وسط البلد، القاهرة",
    addressEn: "Mostafa El-Nahas St, Downtown, Cairo",
    phone: "0227925555",
    whatsapp: "20227925555",
    mapsUrl: "https://maps.app.goo.gl/downtown",
  },
  {
    number: "02",
    nameAr: "فرع المعادي",
    nameEn: "Maadi Branch",
    addressAr: "شارع 9، المعادي، القاهرة",
    addressEn: "Street 9, Maadi, Cairo",
    phone: "0225199999",
    whatsapp: "20225199999",
    mapsUrl: "https://maps.app.goo.gl/maadi",
  },
  {
    number: "03",
    nameAr: "فرع الشيخ زايد",
    nameEn: "Sheikh Zayed Branch",
    addressAr: "محور الشيخ زايد، الشيخ زايد، الجيزة",
    addressEn: "Sheikh Zayed Axis, Sheikh Zayed, Giza",
    phone: "0225358888",
    whatsapp: "20225358888",
    mapsUrl: "https://maps.app.goo.gl/zayed",
  },
  {
    number: "04",
    nameAr: "فرع نيو سيتي",
    nameEn: "New City Branch",
    addressAr: "المنطقة الإدارية الجديدة، العاشر من رمضان",
    addressEn: "New Administrative Capital, 10th of Ramadan",
    phone: "0226887777",
    whatsapp: "20226887777",
    mapsUrl: "https://maps.app.goo.gl/newcity",
  },
];

const menuCategories = [
  {
    nameAr: "الأساسيات",
    nameEn: "Classics",
    order: 0,
    image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/koshari/classic.jpg",
    items: [
      { nameAr: "كشري كلاسيك", nameEn: "Classic Koshari", descAr: "أرز ومكرونة وعدس وصلصة طماطم وبصل مقرمش", descEn: "Rice, pasta, lentils, tomato sauce and crispy onions", price: 45, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/koshari/classic.jpg", badge: "popular" },
      { nameAr: "كشري بالخل", nameEn: "Koshari with Vinegar", descAr: "كشري كلاسيك مع صلصة خل وثوم إضافية", descEn: "Classic koshari with extra vinegar and garlic sauce", price: 50, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/koshari/vinegar.jpg", badge: null },
      { nameAr: "كشري بالشطة", nameEn: "Spicy Koshari", descAr: "كشري كلاسيك مع شطة حارة على المزاج", descEn: "Classic koshari with hot chilli to your taste", price: 50, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/koshari/spicy.jpg", badge: "spicy" },
    ],
  },
  {
    nameAr: "الكشري المتخصص",
    nameEn: "Speciality Koshari",
    order: 1,
    image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/koshari/special.jpg",
    items: [
      { nameAr: "كشري اللحمة", nameEn: "Meat Koshari", descAr: "كشري كلاسيك مع قطع لحمة مطبوخة ببطء", descEn: "Classic koshari with slow-cooked meat pieces", price: 85, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/koshari/meat.jpg", badge: "popular" },
      { nameAr: "كشري الكفتة", nameEn: "Kofta Koshari", descAr: "كشري كلاسيك مع كفتة مشوية على الفحم", descEn: "Classic koshari with charcoal-grilled kofta", price: 90, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/koshari/kofta.jpg", badge: null },
      { nameAr: "كشري الفراخ", nameEn: "Chicken Koshari", descAr: "كشري كلاسيك مع صدور فراخ مشوية", descEn: "Classic koshari with grilled chicken breasts", price: 80, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/koshari/chicken.jpg", badge: null },
      { nameAr: "كشري MIX", nameEn: "Mixed Koshari", descAr: "كشري بجميع الإضافات: لحمة وكفتة وفراخ", descEn: "Koshari with all toppings: meat, kofta and chicken", price: 120, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/koshari/mixed.jpg", badge: "popular" },
    ],
  },
  {
    nameAr: "الساندوتشات",
    nameEn: "Sandwiches",
    order: 2,
    image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/sandwiches/category.jpg",
    items: [
      { nameAr: "ساندوتش كشري", nameEn: "Koshari Sandwich", descAr: "كشري ملفوف في عيش بلدي طازج", descEn: "Koshari wrapped in fresh Egyptian bread", price: 35, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/sandwiches/koshari.jpg", badge: null },
      { nameAr: "ساندوتش كفتة", nameEn: "Kofta Sandwich", descAr: "كفتة مشوية مع طحينة وبصل وطماطم", descEn: "Grilled kofta with tahini, onion and tomato", price: 55, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/sandwiches/kofta.jpg", badge: null },
      { nameAr: "ساندوتش شاورما فراخ", nameEn: "Chicken Shawarma", descAr: "شاورما فراخ مع ثوم وطحينة وخضار", descEn: "Chicken shawarma with garlic, tahini and vegetables", price: 50, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/sandwiches/shawarma.jpg", badge: "popular" },
    ],
  },
  {
    nameAr: "السلطات والأطباق الجانبية",
    nameEn: "Salads & Sides",
    order: 3,
    image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/sides/category.jpg",
    items: [
      { nameAr: "سلطة خضراء", nameEn: "Green Salad", descAr: "خس وطماطم وخيار وزيتون", descEn: "Lettuce, tomato, cucumber and olives", price: 25, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/sides/salad.jpg", badge: null },
      { nameAr: "حمص", nameEn: "Hummus", descAr: "حمص كريمي مع زيت زيتون وليمون", descEn: "Creamy hummus with olive oil and lemon", price: 30, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/sides/hummus.jpg", badge: null },
      { nameAr: "بطاطس محمرة", nameEn: "French Fries", descAr: "بطاطس محمرة مقرمشة مع ملح", descEn: "Crispy golden french fries with salt", price: 20, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/sides/fries.jpg", badge: null },
      { nameAr: "بصل مقرمش", nameEn: "Crispy Onions", descAr: "بصل محمّر مقرمش لإضافة على الكشري", descEn: "Crispy fried onions for topping", price: 10, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/sides/onions.jpg", badge: null },
    ],
  },
  {
    nameAr: "المشروبات",
    nameEn: "Drinks",
    order: 4,
    image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/drinks/category.jpg",
    items: [
      { nameAr: "ليمونادة", nameEn: "Lemonade", descAr: "ليمون طازج نعناع", descEn: "Fresh mint lemonade", price: 20, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/drinks/lemonade.jpg", badge: null },
      { nameAr: "مشروب قمر الدين", nameEn: "Qamar al-Din", descAr: "مشروب مشمش مجفف تقليدي", descEn: "Traditional dried apricot drink", price: 15, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/drinks/qamar.jpg", badge: null },
      { nameAr: "بيبسي", nameEn: "Pepsi", descAr: "بيبسي عادي أو دايت", descEn: "Regular or diet Pepsi", price: 15, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/drinks/pepsi.jpg", badge: null },
      { nameAr: "مياه معدنية", nameEn: "Water", descAr: "زجاجة مياه معدنية", descEn: "Bottle of mineral water", price: 10, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/drinks/water.jpg", badge: null },
    ],
  },
  {
    nameAr: "الحلويات",
    nameEn: "Desserts",
    order: 5,
    image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/desserts/category.jpg",
    items: [
      { nameAr: "أم علي", nameEn: "Om Ali", descAr: "حلوى مصرية تقليدية بالمكسرات والقشطة", descEn: "Traditional Egyptian dessert with nuts and cream", price: 35, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/desserts/omali.jpg", badge: "popular" },
      { nameAr: "كنافة نابلسية", nameEn: "Nabulsi Kunafa", descAr: "كنافة بالجبنة ومكسرات", descEn: "Cheese kunafa with nuts", price: 40, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/desserts/kunafa.jpg", badge: null },
      { nameAr: "بوظة", nameEn: "Ice Cream", descAr: "بوظة بنكهة فراولة أو شوكولاتة أو فانيليا", descEn: "Strawberry, chocolate or vanilla ice cream", price: 25, image: "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images/desserts/icecream.jpg", badge: null },
    ],
  },
];

async function main() {
  console.log("Seeding database...\n");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.restaurantTable.deleteMany();
  await prisma.review.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.systemSetting.deleteMany();

  // Seed branches
  for (const branch of branches) {
    await prisma.branch.create({ data: branch });
  }
  console.log(`${branches.length} branches seeded`);

  // Seed categories and menu items
  for (const cat of menuCategories) {
    const created = await prisma.category.create({
      data: {
        nameAr: cat.nameAr,
        nameEn: cat.nameEn,
        order: cat.order,
        image: cat.image,
        items: {
          create: cat.items.map((item) => ({
            nameAr: item.nameAr,
            nameEn: item.nameEn,
            descAr: item.descAr,
            descEn: item.descEn,
            price: item.price,
            sizes: null,
            image: item.image,
            badge: item.badge,
            available: true,
          })),
        },
      },
    });
    console.log(`  ${cat.nameEn}: ${created.id} (${cat.items.length} items)`);
  }
  console.log(`\n${menuCategories.length} categories seeded`);

  // Seed system settings
  const settings = [
    { key: "site_name_ar", value: "كشري أبو طارك" },
    { key: "site_name_en", value: "Abo Tarek Koshari" },
    { key: "primary_phone", value: "16011" },
    { key: "primary_whatsapp", value: "2016011" },
    { key: "facebook_url", value: "https://web.facebook.com/abotarek" },
    { key: "currency", value: "ج.م" },
    { key: "customer_live_tracking", value: false },
    { key: "staff_sound_alerts", value: true },
    { key: "order_ttl_hours", value: 4 },
  ];

  for (const setting of settings) {
    await prisma.systemSetting.create({ data: setting });
  }
  console.log(`${settings.length} system settings seeded`);

  console.log("\nSeeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
