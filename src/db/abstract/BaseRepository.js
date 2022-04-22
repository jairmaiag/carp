'use strict'

class BaseRepository {
    constructor(model, includes) {
        this.model = model;
        this.includes = includes;
        this.fieldsExcludes = ['id', 'createdAt', 'updatedAt'];
        this.objectExcludes = { exclude: this.fieldsExcludes };
    }
    addFieldExcludes(fields){
        if(!fields){
            return;
        }
        if(fields.length ===0 ){
            return;
        }
        fields.forEach(field => {
            this.fieldsExcludes.push(field);
        });
    }
    
    getObjectExcludes(){
        return this.objectExcludes;
    }

    async findAll(attributes, filter, order) {
        const limitObj = filter ? null : 10;
        const orderObj = order || [['id', 'ASC']];
        const attriObj = attributes || this.getObjectExcludes();
        return this.model.findAll({ attributes: attriObj, where: filter, limit: limitObj, order: orderObj, include: this.includes, raw: false });
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

    async insert(dados) {
        try {
            if (await this.findDuplicate(dados)) {
                throw new Error("violates unique constraint");
            }
            dados = await this.model.create(await this.beforeInsert(dados));
            return await this.findByUUId(dados.UUId);
        } catch (error) {
            if (error.original) {
                throw new Error(error.original);
            } else {
                throw new Error(error.message);
            }
        }
    }

    /**
     * Método será chamado antes da atulização.
     */
    async beforeUpdate(dados) {
        return dados;
    }

    async update(dados) {
        dados = await this.beforeUpdate(dados);
        const result = await this.model.update(dados, { where: { UUId: dados.UUId } });
        return result[0] === 1 ? this.findByUUId(dados.UUId) : null;
    }

    async delete(UUId) {
        return this.model.destroy({ where: { UUId } });
    }

}

module.exports = BaseRepository;