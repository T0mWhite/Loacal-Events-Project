const router = require("express").Router();
const { Event, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // // Get all Events and JOIN with user data
    // const EventData = await Event.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    // Serialize data so the template can read it
    // const Events = EventData.map((Event) => Event.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/homepage", withAuth, async (req, res) => {
  console.log("HOMEPAGE ROUTE START");
  try {
    // Get all Events and JOIN with user data
    const eventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName"],
        },
      ],
    });
console.log(eventData);
    // Serialize data so the template can read it
    const events = eventData.map((event) => event.get({ plain: true }));
    console.log(events);
    // Pass serialized data and session flag into template
    res.render("homepage", {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/events/:id", async (req, res) => {
  console.log("EVENT GET INITIATED");
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["firstName"],
        },
      ],
    });

    const event = eventData.get({ plain: true });
    console.log(event);
    
    // const eventDate = formatDate(event.date_created);
    // console.log(eventDate);

    res.render("event", {
      event,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  console.log("GET DASHBOARD TEST");
  try {
    const eventData = await Event.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ["firstName"],
        },
      ],
    });

    const events = eventData.map((event) => event.get({ plain: true }));
    console.log(events);

console.log("BEFORE USER LOG");
console.log(req.session.user_id);

    const userData = await User.findAll({
      where: { id: req.session.user_id },
    });
    console.log(userData);
    const user = userData.map((user) => user.get({ plain: true }))
    // const user = userData[0].user.get({ plain: true });
    console.log(user);

    res.render("dashboard", {
      events,
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
