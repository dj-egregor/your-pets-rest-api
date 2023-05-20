const fs = require('fs/promises');
const { User } = require('../../models/user');
const { updateCLD } = require('../../helpers/cloudinary');

const updateAvatar = async (req, res, next) => {
    try {
        if (req.file) {
            console.log(req.file);
            const { _id, photoPublicId } = req.user;
            console.log('UUUUUUUUUU', _id, photoPublicId);
            const result = await updateCLD(
                photoPublicId,
                req.file.path,
                'users-avatars'
            );
            await fs.unlink(req.file.path);

            await User.findByIdAndUpdate(_id, {
                avatarURL: result.url,
                photoPublicId: result.public_id,
            });
            res.json({
                avatarURL: result.url,
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = updateAvatar;
