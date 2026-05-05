/**
 * Parsed from an iTunes Search API export (developer lookup JSON).
 * Each entry maps: trackName → name, artworkUrl512 → previewImage, trackViewUrl → href.
 * Regenerate: ITUNES_EXPORT_TXT=/path/to/export.txt node scripts/gen-ios-app-catalog.mjs
 */

import type { ProjectItem } from "./project-types"

export const IOS_APP_STORE_CATALOG_APPS: readonly ProjectItem[] = [
  {
    name: "bite: Order Food",
    summary: "bite - Not all the restaurants. Only the good ones.",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/0e/2a/dd/0e2add20-bb64-8e0b-f887-a333e8ef1cf4/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/bite-order-food/id6446312216?uo=4",
  },
  {
    name: "Ned's Pizza",
    summary:
      "Ned's Pizza Amman: Order Delicious Pizzas, Get Exclusive Deals, and Track Your Delivery in Real-Time!",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e2/84/59/e284590c-e2ab-ce46-e63a-c8d5b8ee1fbc/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/neds-pizza/id1548186403?uo=4",
  },
  {
    name: "Sushi Crush JO",
    summary:
      "Now you can order food online for takeout from Sushi Crush in Amman! View menu, photos, and more. It is fast, & easy to use! Enjoy our delicious sushi with our…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e5/18/28/e518288c-a7b0-7379-c5c4-8b16e2f44ddc/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/sushi-crush-jo/id6444183592?uo=4",
  },
  {
    name: "Kababji Jordan",
    summary:
      "Welcome to the official Kababji Jordan Food Delivery App! Savor the finest Middle Eastern cuisine with our convenient delivery and pickup options. Our app is designed…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/cc/18/08/cc1808c4-6788-5d84-6680-6a2114ebcd3d/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/kababji-jordan/id1592889860?uo=4",
  },
  {
    name: "Donuttery JO",
    summary:
      "Donuttery is here to raise the doughnut bar in Jordan! Our mission is to change your perception of what a doughnut is and what it should taste like. Enjoy the…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/a5/6d/82/a56d823f-4eb1-0436-e94f-fbb9cf88b013/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/donuttery-jo/id6450653520?uo=4",
  },
  {
    name: "Nidal Al Kalha",
    summary:
      "Welcome to the Nidal Al Kalha Restaurants app, your gateway to authentic Jordanian cuisine with 14 branches across Amman.",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/52/1f/a0/521fa0a2-be2d-c1b6-b67c-07113be8c6aa/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/nidal-al-kalha/id6755112977?uo=4",
  },
  {
    name: "Foron Rex JO",
    summary: "Best Bread in Amman? Rex.",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/37/8d/f3/378df390-2cd9-2dcb-b1a7-89b2cae78776/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/foron-rex-jo/id1588037423?uo=4",
  },
  {
    name: "Hash Burger",
    summary:
      "Experience the ultimate burger satisfaction with Hash Burger's delivery app!",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ca/44/2f/ca442fbb-dbca-6844-bee0-e762da143e3d/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/hash-burger/id6711339029?uo=4",
  },
  {
    name: "The Cakery JO",
    summary:
      "Welcome to The Cakery Jo, your go-to destination for homemade desserts and savory selections! Our family-run kitchen is dedicated to providing you with the best…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/9f/b8/92/9fb892b2-49d3-d8c1-c68d-02fac7279d53/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/the-cakery-jo/id1585983688?uo=4",
  },
  {
    name: "Ray's Fried Chicken",
    summary: "Ray's Fried Chicken: Your Nashville Flavor Destination in Amman!",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ae/75/39/ae7539f3-baa2-6f58-094d-866189cd1d2b/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/rays-fried-chicken/id6472181726?uo=4",
  },
  {
    name: "Pizza Nina",
    summary:
      "Love Pizza Nina's authentic flavors? Now enjoy them from anywhere with our app!",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c7/76/22/c77622c3-e9bb-d1cd-418b-9aaf707d38a3/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/pizza-nina/id6502693097?uo=4",
  },
  {
    name: "Bagel O's",
    summary:
      "Welcome to Amman’s first bagel shop, Bagel O’s! Now available for pick-up and delivery, enjoy a selection of fresh bagels, breakfast items, and sandwiches daily.",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/90/a3/5d/90a35d7c-1f08-35b2-13c6-53d20fbf9e8c/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/bagel-os/id6444400380?uo=4",
  },
  {
    name: "Yazan Shawerma",
    summary:
      "Indulge in the irresistible flavors of Shawerma and fried chicken at Yazan Shawerma! Our delectable menu is a culinary journey that promises to tantalize your taste buds.",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/1e/47/f3/1e47f3c9-3c4f-546c-cdcd-73b58712eea5/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/yazan-shawerma/id6468680628?uo=4",
  },
  {
    name: "Chickano",
    summary:
      "Welcome to Chickano – Jordan's favorite spot for fried chicken and spicy tenders!",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d2/b2/f7/d2b2f7fa-284b-c971-b3ba-0ad9224e8890/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/chickano/id6751042695?uo=4",
  },
  {
    name: "Phantom Kitchen",
    summary: "Phantom Kitchen: One App. Four Cravings. No Compromises.",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ff/1b/50/ff1b502e-3e1a-3347-a37a-8b04d7df01f9/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/phantom-kitchen/id6752221214?uo=4",
  },
  {
    name: "Gooey Cookies",
    summary:
      "Welcome to Gooey Cookies, Jordan's first authentic New York City-style cookie experience! Now available on your iPhone, our app brings premium, fresh-baked cookies…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/73/c7/d6/73c7d6fb-b08a-40c6-87a9-88a297c85596/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/gooey-cookies/id6762344859?uo=4",
  },
  {
    name: "Ikura Sushi",
    summary:
      "Welcome to the Ikura app, your ultimate destination for authentic Japanese cuisine in Amman! With our convenient and user-friendly app, you can enjoy the finest…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d7/97/b3/d797b3f9-28d3-891a-1da4-21550ddb0c0a/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/ikura-sushi/id1660750184?uo=4",
  },
  {
    name: "Tikka Chicken JO",
    summary:
      "Get Tikka Chicken's delicious Indian dishes delivered in Amman! Easy ordering, real-time tracking, and exclusive deals await.",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/5c/4a/96/5c4a96ef-40be-1255-e2a9-9589279412b7/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/tikka-chicken-jo/id6446815686?uo=4",
  },
  {
    name: "THE FIT BAR JO",
    summary:
      "Discover THE FIT BAR app for healthy meals delivered in Amman. Order quickly, track in real-time, and enjoy exclusive deals!",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/77/04/ae/7704ae6d-7970-09f7-b848-085bf5461db4/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/the-fit-bar-jo/id1637858359?uo=4",
  },
  {
    name: "Pachi Pizza & Pasta",
    summary:
      "Welcome to Pachi Pizza and Pasta, your destination for authentic Italian cuisine! We’re dedicated to serving fresh, quality dishes made with love and the finest…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a4/c8/26/a4c82689-4190-30d7-0f32-ede462800e45/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/pachi-pizza-pasta/id6738088592?uo=4",
  },
  {
    name: "Don Poio",
    summary:
      "Welcome to Don Poio, the 1 & only Peruvian Rotisserie Chicken joint in Arabia. Our app brings you a flavor-packed feast right to your doorstep in Amman.",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ef/ff/09/efff09fc-11ea-2778-d72c-4175a7c889a1/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/don-poio/id6449976381?uo=4",
  },
  {
    name: "The Big Slice",
    summary:
      "Welcome to The Big Slice, Amman's premier pizzeria, now available at your fingertips!",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/95/75/96/95759649-53d8-b701-0b2d-da95aedcf18c/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/the-big-slice/id1561953193?uo=4",
  },
  {
    name: "Pizza SQRD",
    summary:
      "Experience the best of Amman's pizza scene with Pizza SQRD! Our dough is a mix of passion and bakery science, delivering highly digestible and delicious pizzas right…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/6a/7b/09/6a7b0938-4378-1a88-15c8-57ae62e787d9/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/pizza-sqrd/id6670739522?uo=4",
  },
  {
    name: "Sakura Sushi & Chinese Food",
    summary:
      "Explore Sakura Sushi, your gateway to exquisite sushi and Chinese delights.",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/27/82/04/278204a9-ef7f-acd8-f310-4b4edbb4802c/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/sakura-sushi-chinese-food/id6472668520?uo=4",
  },
  {
    name: "Mad Mango",
    summary:
      "Introducing Mad Mango – your ultimate destination for healthy eats and rejuvenating smoothies! Whether you're a wellness enthusiast or a culinary explorer, Mad Mango…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/1f/aa/4f/1faa4f8c-7f14-0508-e486-a72cd2e9f97e/AppIcon-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/mad-mango/id6478771946?uo=4",
  },
  {
    name: "Four Winters",
    summary:
      "Turn every moment into an ice cream celebration with Four Winters",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ff/de/ae/ffdeae14-9139-26a6-ece3-1675407cc031/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/four-winters/id6752581401?uo=4",
  },
  {
    name: "Pounder JO",
    summary:
      "Discover the best burgers, shakes, and salads in Amman with Pounder App!",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/5b/e2/3f/5be23f50-6c94-b9fc-2eaf-24b980a783c3/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/pounder-jo/id6446063215?uo=4",
  },
  {
    name: "TJ Burger",
    summary:
      "Discover the perfect burger experience with the TJ Burger app. Enjoy homemade burger recipes on brioche buns, and get rewarded with loyalty perks and free delivery.…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/64/42/78/644278ff-0d23-85bc-a673-bb3f15dd3a36/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/tj-burger/id6451102804?uo=4",
  },
  {
    name: "Sofia Turkish Restaurant",
    summary:
      "Welcome to our Turkish cuisine delivery app, where you can savor the rich flavors of expertly crafted dishes, refreshing sips, and indulgent desserts right from your…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a5/dc/df/a5dcdf84-a8de-16fd-dd53-2fafa0483edb/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/sofia-turkish-restaurant/id6738188563?uo=4",
  },
  {
    name: "Sushi Crazy JO",
    summary:
      "With the Sushi Crazy app, you can now place online orders for pickup or delivery!",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/f4/f6/59/f4f659ff-88c6-be98-1750-66a5b8856006/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/sushi-crazy-jo/id1667305877?uo=4",
  },
  {
    name: "Food Trends",
    summary:
      "Craving pressed Angus beef burgers, legendary chicken fingers, or loaded fries? FOOD TRENDS JO brings Amman's favorite burger restaurant straight to your doorstep via…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6b/d3/1e/6bd31e07-cd39-7372-026a-b62fb20dd540/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/food-trends/id6758948308?uo=4",
  },
  {
    name: "The Salad Boutique",
    summary:
      "You can now order for pick up or delivery online using The Salad Boutique's app!",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/71/c2/c6/71c2c6bc-17ee-edf1-2f0a-46acdad916ea/AppIcon-0-0-1x_U007emarketing-0-8-0-P3-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/the-salad-boutique/id1666301447?uo=4",
  },
  {
    name: "Hashi Sushi",
    summary:
      "With the Hashi app, skip the traffic and order your favorite sushi rolls at home!",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/7f/27/8d/7f278d9a-1c17-5e5c-eea8-28c1709489e6/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/hashi-sushi/id6448789877?uo=4",
  },
  {
    name: "Foodz JO",
    summary:
      "Welcome to Foodz, your ultimate destination for a healthier and tastier lifestyle! Explore a world of nutritious delights as you shop online for a wide variety of…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ce/5f/b1/ce5fb141-b81a-f952-42be-7405654bd6de/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/foodz-jo/id6468679697?uo=4",
  },
  {
    name: "Nommers",
    summary:
      "Nommers is your ultimate destination for the best brunch, desserts, and coffee in Jordan.",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/62/aa/04/62aa0428-d406-72f7-474d-7c966da45f46/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/nommers/id6754242742?uo=4",
  },
  {
    name: "The Cake Baker",
    summary:
      "The Cake Baker brings Amman's finest cakes, cheesecakes, cookies, and desserts straight to your door. Whether you're celebrating a special occasion or treating…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/79/82/f0/7982f08f-c93e-b590-f4d6-8d9ec3fb33a6/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/the-cake-baker/id6758397906?uo=4",
  },
  {
    name: "Bash Burger",
    summary:
      "Welcome to the Bash Burger app, your gateway to the best gourmet burgers and steak sandwiches in Amman! We specialize in delivering bold flavors with premium…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/82/ca/60/82ca6084-9d18-5a20-f23e-e046351190b7/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/bash-burger/id6737501387?uo=4",
  },
  {
    name: "Tandoori Oven JO",
    summary:
      "Craving Indian flavors? Order curries, tandoori dishes & more from Tandoori Oven JO. Easy ordering, fast delivery & convenient pickup. Download the app & embark on a…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/12/d7/fe/12d7fe63-32d7-cd72-debc-927546d7be04/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/tandoori-oven-jo/id6502703876?uo=4",
  },
  {
    name: "Street Burger",
    summary:
      "From our signature Oklahoma Burger and juicy Classic Burger, to crispy Chicken Tenders and the indulgent Truffle & Brie Burger, Street Burger is all about quality…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/31/82/77/3182778e-205b-a726-f696-29815dba3b85/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/street-burger/id6751192600?uo=4",
  },
  {
    name: "Cube Burger",
    summary:
      "Welcome to the official CUBE BURGER app – your gateway to the finest burgers in Jordan, now at your fingertips. We are revolutionizing how Amman experiences premium…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/a9/db/c7/a9dbc76b-352f-815e-6643-c2bb43e7f93f/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/cube-burger/id1613495795?uo=4",
  },
  {
    name: "SLCTD",
    summary:
      "Burger lovers, welcome to SLCTD – Amman's newest burger destination that's already creating a buzz across the city. Experience burgers with a local twist: fresh…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ec/72/76/ec7276c5-7217-ed66-388c-afd0e02880ef/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/slctd/id6759713406?uo=4",
  },
  {
    name: "Fuel Food Truck JO",
    summary:
      "Craving a juicy burger, crispy golden fries, or a refreshing mojito or shake? Fuel Food Truck app is your ultimate passport to burger bliss! Order your favorite…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/0a/be/7c/0abe7ccd-5deb-ed7b-f8b2-8f7062332bea/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/fuel-food-truck-jo/id6740744361?uo=4",
  },
  {
    name: "Foron Abd",
    summary:
      "Craving a warm, buttery croissant or a freshly baked loaf of bread? Look no further! The Foron Abd app brings the best of our delicious pastries, breads, and more…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/df/91/e7/df91e74b-ed0b-2303-b448-c4f0d90186ca/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/foron-abd/id6739537683?uo=4",
  },
  {
    name: "Karam Beirut",
    summary:
      "Get a taste of Lebanon delivered straight to your door, or pick it up for a quick and delicious meal! Order authentic Lebanese cuisine with the Karam Beirut app.",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/8e/0e/45/8e0e45df-202a-70ce-d40a-6a2718ad0489/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/karam-beirut/id6478389102?uo=4",
  },
  {
    name: "DRP Coffee",
    summary:
      "Craving exceptional coffee? DRP Coffee brings Amman's specialty coffee experience straight to your doorstep. From rich Spanish Lattes to bold Turkish Coffee, order…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/5d/25/b7/5d25b7e5-1167-636f-2e3a-e9f7226b40a9/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/drp-coffee/id6757497734?uo=4",
  },
  {
    name: "Butter Chicken Boss",
    summary:
      "Calling all Butter Chicken lovers! Butter Chicken Boss brings your Indian food cravings to life with our convenient app. Indulge in our signature Butter Chicken,…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ab/b3/f6/abb3f66c-d999-9ae3-82f9-0f48b35db021/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/butter-chicken-boss/id6505009672?uo=4",
  },
  {
    name: "Crusters",
    summary:
      "Craving flaky, buttery croissants or authentic artisan sourdough? The Crusters app brings Amman's finest bakery straight to your door.",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/41/30/7c/41307cee-b872-110c-b4d5-02291d4c78c6/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/crusters/id6758253612?uo=4",
  },
  {
    name: "One For All JO",
    summary:
      "Welcome to One For All – where everything is deliciously affordable! Craving juicy burgers, crispy chicken, and loaded fries without breaking the bank? Our app brings…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/fa/1b/85/fa1b854a-dba4-cced-14dd-b3459f139ce6/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/one-for-all-jo/id6757407591?uo=4",
  },
  {
    name: "Seed JO",
    summary: "Seed Amman – Your Fresh Food Delivery Experience",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/69/20/7b/69207b0b-7191-6cd1-aaf5-a015fd1bc7c6/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/seed-jo/id1552688681?uo=4",
  },
  {
    name: "On Ice",
    summary:
      "On Ice is no run-of-the-mill ice cream! With over 15 years of experience comes the perfect blend of flavor and service. Order now and taste the difference.",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ff/46/3d/ff463dbe-ce89-5267-97a5-bfe4444ffcd0/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/on-ice/id1637490802?uo=4",
  },
  {
    name: "Night Shift Burger",
    summary:
      "Welcome to Night Shift Burger, your destination for the juiciest smashed burgers in Amman! Our app is designed to make your dining experience as smooth and satisfying…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/13/da/0c/13da0c87-caba-9b36-4486-03f65b67a20b/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/night-shift-burger/id6673909018?uo=4",
  },
  {
    name: "Almashreq Mobile JO",
    summary:
      "Welcome to the official Almashreq Mobile app – your one-stop shop for the best prices on tech accessories in Amman!",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/97/ca/f1/97caf104-e27c-9460-c2e8-4c00a8f545e2/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/almashreq-mobile-jo/id1643320609?uo=4",
  },
  {
    name: "Triple 7 JO",
    summary:
      "Triple 7 brings you the best food in Amman - all in one app. Order fresh burgers, crispy fries, creamy pasta, authentic Arabic dishes, tasty Asian meals, and more,…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/50/d0/23/50d023a6-403a-6894-4bf2-c8618a62519a/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/triple-7-jo/id6749952871?uo=4",
  },
  {
    name: "Qahwih",
    summary: "QAHWIH COFFEE HOUSE: Your 24/7 Coffee Destination in Abdoun",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/fc/06/47/fc06472f-f6e0-18b1-0a02-af14d443fe2f/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/qahwih/id6758935584?uo=4",
  },
  {
    name: "Wingman JO",
    summary:
      "Welcome to WingMan, your ultimate app for the best wings, burgers, and sandwiches in Amman! With our easy ordering feature, you can place an order in seconds and…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f3/02/48/f3024884-8067-1545-4a75-5b78262cbcf1/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/wingman-jo/id6754012316?uo=4",
  },
  {
    name: "Marmalade JO",
    summary:
      "Marmalade Bakery specializes in crafting delicious, homemade-style treats using quality ingredients and traditional techniques. From freshly baked breads to rich…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b6/fd/60/b6fd6019-a35f-286e-c0dc-288d5c186fcc/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/marmalade-jo/id6504227975?uo=4",
  },
  {
    name: "Tatbeeqi Merchant",
    summary: "Streamline Your Store Operations from Anywhere",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/14/27/21/142721ce-4438-5c85-688a-518dd999517c/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/tatbeeqi-merchant/id1629319643?uo=4",
  },
  {
    name: "Indish JO",
    summary:
      "Indish delivers the vibrant flavors of India straight to your door! Explore our menu filled with authentic Indian dishes, from mouthwatering curries and fragrant…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/7c/43/ca/7c43ca30-4315-a356-fd42-c650fe35371c/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/indish-jo/id1609251530?uo=4",
  },
  {
    name: "Shai w Na3na3",
    summary:
      "From breakfast to late-night cravings, Shai W Na3na3 has you covered. Browse a wide variety of salads, sandwiches, desserts, and drinks — available 24/7 for delivery…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a2/63/eb/a263eb31-f45c-2b61-9695-b79cd4ab24e8/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/shai-w-na3na3/id6747667850?uo=4",
  },
  {
    name: "Shawerma 3a Saj JO",
    summary: "Shawerma 3a Saj: Authentic Flavor. Now on Your iPhone.",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b5/89/3f/b5893f25-2607-da68-ea0d-23f7f57ac41d/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/shawerma-3a-saj-jo/id1610987832?uo=4",
  },
  {
    name: "Eggcited JO",
    summary: "Start your day right with Eggcited!",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/fc/0c/61/fc0c61d3-b559-9fe3-d849-62e5b66edc18/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/eggcited-jo/id6753948207?uo=4",
  },
  {
    name: "Al Karma Kitchen",
    summary: "AL KARMA KITCHEN: WHERE TRADITION MEETS COMMUNITY",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ab/e7/5d/abe75d28-615e-d3d2-6d28-f7028a2947ca/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/al-karma-kitchen/id6758945043?uo=4",
  },
  {
    name: "Indian Restaurant JO",
    summary:
      "Welcome to Indian Restaurant, your go-to app for authentic Indian cuisine delivered right to your doorstep in Amman! Whether you're craving Mutton, Vegetarian Dishes,…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/3b/ad/e4/3bade484-ab9e-4d42-605e-79d78081abbc/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/indian-restaurant-jo/id6755430621?uo=4",
  },
  {
    name: "Al Hanini",
    summary: "Savor the Flavor of Real Shawarma – Order Now with Ease",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/72/92/08/7292089d-0311-5adb-9e77-6876a1c5c5d4/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/al-hanini/id6749500167?uo=4",
  },
  {
    name: "Holy Smash",
    summary: "HOLY SMASH: AMMAN'S STREET-STYLE SMASHED BURGERS",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/6b/7d/1d/6b7d1daa-d15c-9f2b-d89d-b088efe64082/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/holy-smash/id6758948127?uo=4",
  },
  {
    name: "au Jus",
    summary: "au Jus: Gourmet Sandwiches, Soups, & Desserts - Delivered!",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2a/0f/08/2a0f086a-100d-ccae-6a35-021d4987173c/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/au-jus/id6752584983?uo=4",
  },
  {
    name: "AlQuds AlJadeed",
    summary:
      "AlQuds AlJadeed delivers four decades of culinary mastery straight to your door in Amman. Savor authentic Middle Eastern and Arabic cuisine crafted with generational…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/82/62/04/82620408-ff4a-a197-0ebc-9e8a5adf8280/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/alquds-aljadeed/id6761330887?uo=4",
  },
  {
    name: "Mawwal JO",
    summary:
      "Bring the welcoming, family-friendly atmosphere and the mouth-watering flavors of Mawwal home. Located centrally in Al-Sweifieh/6th Circle, we are known across Amman…",
    kind: "mobile",
    previewImage:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/04/09/a5/0409a5e6-1dc0-981a-b8db-dacbb44a8dac/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/mawwal-jo/id6754011711?uo=4",
  },
]
