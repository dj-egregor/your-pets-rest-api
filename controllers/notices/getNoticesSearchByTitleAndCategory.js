const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');

const getNoticesSearchByTitleAndCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        const { page = 1, limit = 12, q = '', age = [], sex } = req.query;
        const skip = (page - 1) * limit;

        console.log('req.params', req.params);
        console.log('req.query', req.query);

        const searchWords = q.trim().split(' ');
        const regex = new RegExp(searchWords, 'i');

        const now = new Date();

        let ageRangeStart, ageRangeEnd;

        if (age.includes('3-12m')) {
            ageRangeStart = new Date(
                now.getFullYear(),
                now.getMonth() - 12,
                now.getDate()
            );
            ageRangeEnd = new Date(
                now.getFullYear(),
                now.getMonth() - 3,
                now.getDate()
            );
        } else if (age.includes('1year')) {
            ageRangeStart = new Date(
                now.getFullYear() - 2,
                now.getMonth(),
                now.getDate()
            );
            ageRangeEnd = new Date(
                now.getFullYear() - 1,
                now.getMonth(),
                now.getDate()
            );
        } else if (age.includes('2year')) {
            ageRangeStart = new Date(
                now.getFullYear() - 3,
                now.getMonth(),
                now.getDate()
            );
            ageRangeEnd = new Date(
                now.getFullYear() - 2,
                now.getMonth(),
                now.getDate()
            );
        }

        console.log(ageRangeStart, ageRangeEnd);

        const query = {
            category,
            title: regex,
        };

        if (sex) {
            query.sex = Array.isArray(sex) ? { $in: sex } : sex;
        }

        if (ageRangeStart && ageRangeEnd) {
            query.birthday = { $gte: ageRangeStart, $lt: ageRangeEnd };
        }

        const total = await Notice.countDocuments(query);

        const notices = await Notice.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'owner',
                select: 'email phone',
            });

        if (notices.length === 0) {
            throw new NotFound(`There are no notices for this request`);
        }

        const totalPages = Math.ceil(total / limit);

        res.json({
            notices,
            total,
            totalPages,
            currentPage: parseInt(page),
            limit: parseInt(limit),
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getNoticesSearchByTitleAndCategory;
