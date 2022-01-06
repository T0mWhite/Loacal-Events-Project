const router = require("express").Router();
const moment = require('moment');
const { Event } = require("../../models");

//post new event
router.post("/", async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
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
// const { event_time } = event;
const event_time = event.event_time;
console.log(event.event_time);
    res.render("event", {
      event,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete event
router.delete('/:id', async (req, res) => {
  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: 'No event found with this id!' });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
