const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLD_CLOUD_NAME,
    api_key: process.env.CLD_API_KEY,
    api_secret: process.env.CLD_API_SECRET,
});

async function uploadCLD(file, folder) {
    const result = await cloudinary.uploader.upload(file, { folder });
    return result;
}
async function removeCLD(publicId) {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
}

const updateCLD = async (publicId, imagePath, folder) => {
    try {
        await cloudinary.uploader.destroy(publicId);

        const result = await cloudinary.uploader.upload(imagePath, { folder });

        return {
            url: result.secure_url,
            public_id: result.public_id,
        };
    } catch (error) {
        throw new Error('Failed to update image in Cloudinary');
    }
};

module.exports = {
    uploadCLD,
    removeCLD,
    updateCLD,
};
