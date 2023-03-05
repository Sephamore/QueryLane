import {TagsModel} from "../models/init-models.js";

export const getTags = async (req, res) => {
    try {
        let tags = await TagsModel.findAll({
            order: [['count', 'DESC']],
        });
        // tags= tags.map((t)=>t.tag_name);
        res.json(tags);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getTagsByNames = async (req, res) => {
    try {
        const tagNames = req.params.names.split('&');
        let tags = await TagsModel.findAll({
            where: {
                tag_name: tagNames
            }
        });
        res.json(tags);
    } catch (error) {
        res.json({ message: error.message });
    }
}