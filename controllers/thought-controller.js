const path = require('path');
const { User, Thought } = require(path.join(__dirname, '../models'));

const thoughtController = {
    async getAllThoughts(req, res) {
        try {
            const thoughtsdb = await Thought.find();
            res.json(thoughtsdb);
        } catch (err) {
            console.log(err);
            res.sendStatus(500).json(err);
        }
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getThoughtById({ params }, res) {
        Thought.findById({ _id: params.id })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },

    deleteThought({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.id })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findByIdAndUpdate({ _id: params.id }, { $addToSet: { reactions: body } }, { new: true })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.status(400).json(err));
    },

    removeReaction({ params }, res) {
        Thought.findByIdAndUpdate({ _id: params.id }, { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.status(400).json(err));
    },
};

module.exports = thoughtController;