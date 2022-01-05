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
  try {
    // Get all Events and JOIN with user data
    const eventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const events = eventData.map((event) => event.get({ plain: true }));
    console.log(events[0].user.name);
    // Pass serialized data and session flag into template
    res.render("homepage", {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/events/:id", withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const event = eventData.get({ plain: true });

    res.render("event", {
      ...event,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  console.log("TESTSETSETSETSETES");
  try {
    const eventData = await Event.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const events = eventData.map((event) => event.get({ plain: true }));
    console.log(events);
    res.render("dashboard", {
      events,
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
