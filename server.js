const express = require('express');
const app = express();
const PORT = 3000;

const prisma = require("./prisma");

app.use(express.json());
app.use(require('morgan')('dev'));

//GET /api/customers
app.get("/api/customers", async(req,res,next) =>  {
    try {
        const customers = await prisma.customer.findMany();
        res.json(customers);
    } catch (error) {
        next();
    }
})

//GET /api/restaurants
app.get("/api/restaurants", async(req,res,next) => {
    try {
        const restaurants = await prisma.restaurant.findMany();
        res.json(restaurants);
    } catch (error) {
        next();
    }
})

//GET /api/reservations 
app.get("/api/reservations", async(req,res,next) => {
    try {
        const reservations = await prisma.reservation.findMany();
        res.json(reservations);
    } catch (error) {
        next();
    }
})

//POST /api/customers/:id/reservations 
app.post("/api/customers/:id/reservations", async(req,res,next) => {
    try {
        const customerId = +req.params.id;
        const {restaurantId, date, partyCount} = req.body;
        const reservation = await prisma.reservation.create({
            data:{
                customerId,
                restaurantId,
                date,
                partyCount,
            }
        });
        res.status(201).json(reservation);
    } catch (error) {
        next();
    }
})


//DELETE /api/customers/:customerId/reservations/:id
app.delete("/api/customers/:customerId/reservations/:id", async(req,res,next) => {
    try {
        const id = +req.params.id;

        const reservationExists = await prisma.reservation.findFirst({where:{id}});

        if (!reservationExists){
            return next({
                status:404,
                message:`Could not find the reservation with id ${id}`,
            })
        }
        await prisma.reservation.delete({where:{id}});
        res.sendStatus(204);
    } catch (error) {
        next();
    }
})

// Simple error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status ?? 500;
  const message = err.message ?? 'Internal server error.';
  res.status(status).json({ message });
});

app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)})