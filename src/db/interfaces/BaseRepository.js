'use strict'

class BaseRepository {
    constructor(model, includes) {
        this.model = model;
        this.includes = includes;
        this.attriObj = { exclude: ['id', 'createdAt', 'updatedAt'] };
    }

    async findAll(attributes, filter, order) {
        const limitObj = filter ? null : 10;
        const orderObj = order || [['id', 'ASC']];
        const attriObj = attributes || this.attriObj;
        return this.model.findAll({ attributes: attriObj, where: filter, limit: limitObj, order: orderObj, raw: false });
    }

    async findAndPaginate(attributes, filter, order, page) {
        return this.model.findAndPaginate(attributes, filter, order, page);
    }

    async findAndPaginateWithChildren(attributes, filter, order, page) {
        return this.model.findAndPaginate(attributes, filter, order, page, this.includes);
    }

    async findById(id) {
        return this.model.findByPk(id, { include: this.includes });
    }

    async findByUUId(UUId) {
        return this.model.findOne({ attributes:this.attriObj, where: { UUId }, include: this.includes });
    }

    /**
     * Este método deverá ser sobrescrito nas classes que extendem essa classe.
     */
    async findDuplicate(dados) {
        return null;
    }

    async insert(dados) {
        try {
            if (await this.findDuplicate(dados)) {
                throw new Error("violates unique constraint");
            }
            return await this.model.create(dados);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(dados) {
        const result = await this.model.update(dados, { where: { UUId: dados.UUId } });
        return result[0] === 1 ? this.findByUUId(dados.UUId) : null;
    }

    async delete(UUId) {
        return this.model.destroy({ where: { UUId } });
    }

}

module.exports = BaseRepository;