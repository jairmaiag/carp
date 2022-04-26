'use strict'
const Sequelize = require('sequelize');
const { in: opIn } = Sequelize.Op;

class BaseRepository {
    constructor(model, includes) {
        this.model = model;
        this.includes = includes;
        this.fieldsExcludes = ['id', 'createdAt', 'updatedAt'];
        this.objectExcludes = { exclude: this.fieldsExcludes };
        this.objectExcludesTemp = {};
        this.modelsHasMany = [];
    }
    addModelsHasMany(models) {
        if (!models) {
            return [];
        }
        if (Array.isArray(models) && models.length > 0) {
            models.forEach(m => this.modelsHasMany.push(m));
        }
        return this.modelsHasMany;
    }
    getModelsHasMany() {
        return this.modelsHasMany;
    }
    addFieldExcludes(fields) {
        if (!fields) {
            return;
        }
        if (fields.length === 0) {
            return;
        }
        fields.forEach(field => {
            this.fieldsExcludes.push(field);
        });
    }
    setObjectExcludes(objectExcludes) {
        this.objectExcludes = objectExcludes;
    }

    getObjectExcludes() {
        return this.objectExcludes;
    }

    async findAll(attributes, filter, order, withoutIncludes) {
        const limitObj = filter ? null : 10;
        const orderObj = order || [['id', 'ASC']];
        const attriObj = attributes || this.getObjectExcludes();
        const includes = withoutIncludes ? [] : this.includes;
        return this.model.findAll({ attributes: attriObj, where: filter, limit: limitObj, order: orderObj, include: includes, raw: false });
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

    async findIdsByUUIds(UUIds) {
        // const logar = console.log;
        const logar = null;
        return await this.model.findAll({logging: logar, attributes: ["id"], where : { "UUId": { [opIn]: UUIds }}, raw: false });
    }

    async findByUUId(UUId) {
        return UUId ? this.model.findOne({ attributes: this.objectExcludes, where: { UUId }, include: this.includes }) : null;
    }

    /**
     * Método deverá ser sobrescrito nas classes que extendem essa classe.
     */
    async findDuplicate(dados) {
        return null;
    }

    /**
     * Método será chamado antes da inclusão.
     */
    async beforeInsert(dados) {
        return dados;
    }

    /**
     * Método será chamado depois da inclusão.
     */
    async afterInsert(dados) {
        return dados;
    }

    async insert(dados) {
        try {
            if (await this.findDuplicate(dados)) {
                throw new Error("violates unique constraint");
            }
            // dados = await this.beforeInsert(dados);
            dados = await this.model.create(await this.beforeInsert(dados));
            dados = await this.afterInsert(dados);
            return await this.findByUUId(dados.UUId);
        } catch (error) {
            if (error.original) {
                throw new Error(error.original);
            } else {
                throw new Error(error.message);
            }
        }
    }
    async insertBulk(dados) {
        return await this.model.bulkCreate(dados);
    }

    /**
     * Método será chamado antes da atulização.
     */
    async beforeUpdate(dados) {
        return dados;
    }

    /**
     * Método será chamado depois da atulização.
     */
     async afterUpdate(dados) {
        return dados;
    }

    async update(dados) {
        if (!dados.UUId) {
            throw new Error("Campo UUId obriagatório.");
        }
        dados = await this.beforeUpdate(dados);
        const result = await this.model.update(dados, { where: { UUId: dados.UUId } });
        dados = await this.afterUpdate(dados);
        return result[0] === 1 ? this.findByUUId(dados.UUId) : null;
    }

    async delete(UUId) {
        return this.model.destroy({ where: { UUId } });
    }

}

module.exports = BaseRepository;