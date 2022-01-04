const router = require('express').Router();
const { Event } = require('../../models');

//post new event
router.post('/', async (req, res) => {
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

//get event by id
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "event_date", "event_location", "event_time", "user_id"],
    include: [
      {
        model: user,
        as: "events",
        attributes: ["id", "comment_text", "user_id"],
      },
    ],
  }) //include the posts and comments of this user
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No Post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete event
router.delete('/:id', async (req, res) => {
  try {
    const eventData = await event.destroy({
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
    res.status(500).json(err);
  }
});

module.exports = router;
