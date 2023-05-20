const fs = require('fs/promises');
const { User } = require('../../models/user');
const { uploadCLD } = require('../../helpers/cloudinary');

const updateAvatar = async (req, res, next) => {
    try {
        if (req.file) {
            const { _id} = req.user;
            const result = await uploadCLD(
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
