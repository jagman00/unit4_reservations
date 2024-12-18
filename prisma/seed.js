const prisma = require("../prisma");
const seed = async () => {
  // TODO: Create 4Customers, 3Restaurants and 3Reservations
  const createCustomers = async() => {
    const customers = [
        {name:"Amy"},
        {name:"Bob"},
        {name:"Cathy"},
        {name:"David"},
    ];
    await prisma.customer.createMany({data:customers});
  };

  const createRestaurants = async() => {
    const restaurants = [
        {name:"Golden Palace"},
        {name:"Ocean Sea"},
        {name:"Yummy Chill"},
    ];
    await prisma.restaurant.createMany({data:restaurants});
  };

  const createReservations = async() => {
    const reservations = [
        {customerId:1, restaurantId:1, date:new Date("2024-12-10"), partyCount:3},
        {customerId:2, restaurantId:2, date:new Date("2024-12-15"), partyCount:5},
        {customerId:3, restaurantId:3, date:new Date("2024-12-30"), partyCount:8},
    ];
    await prisma.reservation.createMany({data:reservations});
  };

  await createCustomers();
  await createRestaurants();
  await createReservations();
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});