const router = require("express").Router();
const { Event, User } = require("../models");
const withAuth = require("../utils/auth");

// render the login page at site index
router.get("/", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

// render the homepage
router.get("/homepage", withAuth, async (req, res) => {
  try {
    // Get all Events and JOIN with user data to make first name available to template
    const eventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName"],
        },
      ],
    });

    // serialize data so the template can read it
    const events = eventData.map((event) => event.get({ plain: true }));

    // pass serialized data and session flag into template
    res.render("homepage", {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// render a specific event
router.get("/events/:id", async (req, res) => {
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

    res.render("event", {
      event,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// render the user's dashboard
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

    const userData = await User.findAll({
      where: { id: req.session.user_id },
    });

    const user = userData.map((user) => user.get({ plain: true }));
    // const user = userData[0].user.get({ plain: true });

    res.render("dashboard", {
      events,
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// renders login - maybe not needed anymore
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
