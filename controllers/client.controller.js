const {Users, UORelation} = require("../models");
const Sequelize = require('sequelize');
const generator = require("generate-password");
const { col, Op } = Sequelize   
const bcrypt = require("bcrypt");
const response_messages = require("./response_messages/message");
const { getPagination, getRoleClient, createUserOrganization, sendEmailLink } = require('./helperFunction/helper');

const addClient = async( request, response) => {
    try {
        const { user } = request
        const { full_name, email, phone } = request.body
        if(!full_name || !email) return response.status(400).send({ success: false, message: response_messages.n_data })
        let organization_id = user.organisation[0].organization_id
        const isAlreadyClients = await Users.findOne({ where: {email}});
        if (isAlreadyClients) return response.status(400).send({ success: false, message: response_messages.c_exist });
        let password = generator.generate({
            length: 6,
            numbers: true,
          });
        let encryptedPassword = await bcrypt.hash(password, 12);
        const client = await Users.create({
            full_name, 
            email,
            phone,
            password: encryptedPassword,
            verified: false
        })
        if(!client) return response.status(400).send({ success: false, message: response_messages.s_wrong });
        const roleClient = await getRoleClient()
        const userOrgazation = await createUserOrganization(client.id, organization_id, roleClient)
        if (!userOrgazation) return response.status(400).send({ success: false, message: response_messages.s_wrong });
        await sendEmailLink(client.id, email)
        return response.status(200).send({ success: true, message: response_messages.success, response_data: client })
    } catch(err){
        return response.status(500).send({ success: false, message: err.message });
    }
}

const getClient = async( request, response) => {
    try {
        const clientRole = await getRoleClient();
        const { user } = request
        let organization_id = user.organisation[0].organization_id
        const { page_number, page_size } = request.query;
        const { limit, offset } = getPagination(page_number, page_size, 10);
        const client = await UORelation.findAndCountAll({
            limit, offset,
            distinct: true,
            where : { organization_id, role: clientRole, status:true},
            include: {
                model: Users,
                where: {
                id: col('users_organizations.user_id')
                },
                attributes: ['id', 'full_name', 'email'],
                as : 'users',
                required: false
            }
        })
        return response.status(200).send({ success: true, message: response_messages.success, response_data: client })
    } catch(err){
        return response.status(500).send({ success: false, message: err.message });
    }
}

const getClientDetail = async( request, response) => {
    try {
        const { id } = request.params
        const client = await UORelation.findOne({
            where: {user_id:id, status:true},
            include: {
                model: Users,
                where: {
                id: col('users_organizations.user_id')
                },
                attributes: ['id', 'full_name', 'email'],
                as : 'users',
                required: false
            }
        })
        if(!client) return response.status(400).send({ success: false, message: response_messages.s_wrong })
        return response.status(200).send({ success: true, message: response_messages.success, response_data: client })
    } catch(err){
        return response.status(500).send({ success: false, message: err.message });
    }
}

const updateClient = async( request, response) => {
    try {
        const { id } = request.params
        const { user } = request
        const { full_name, email, phone } = request.body
            let condition = {}
            if (full_name) condition.full_name = full_name;
            if (email) condition.email = email;
            if (phone) condition.phone = phone;
        if(Object.keys(condition).length == 0 && condition.constructor === Object){
            return response.status(400).send({ success: false, message: response_messages.s_wrong })
        }
        if(email){
            const isAlreadyClient= await Users.findOne({ where: {email}});
            if (isAlreadyClient) return response.status(400).send({ success: false, message: response_messages.c_exist });
        }
        
        const client = await Users.update(condition, {
            where : {id}
        })
        if(client[0] == 0) return response.status(400).send({ success: false, message: response_messages.s_wrong })
        return response.status(200).send({ success: true, message: response_messages.success, response_data: client })
    } catch(err){
        return response.status(500).send({ success: false, message: err.message });
    }
}

const deleteClient  = async( request, response) => {
    try {
        const { id } = request.params
        if(!id){
            return response.status(400).send({ success: false, message: response_messages.s_wrong })
        }
        const client = await Users.destroy({
            where : {id}
        })
        if(client == 0) return response.status(400).send({ success: false, message: response_messages.s_wrong })
        return response.status(200).send({ success: true, message: response_messages.success, response_data: client })
    } catch(err){
        return response.status(500).send({ success: false, message: err.message });
    }
}

const deleteMultipleClient  = async( request, response) => {
    try {
        const { id } = request.body
        if(!id){
            return response.status(400).send({ success: false, message: response_messages.s_wrong })
        }
        const client = await Client.destroy({
            where : {id}
        })
        if(client == 0) return response.status(400).send({ success: false, message: response_messages.s_wrong })
        return response.status(200).send({ success: true, message: response_messages.success, response_data: client })
    } catch(err){
        return response.status(500).send({ success: false, message: err.message });
    }
}

const archiveClient = async (request, response) => {
    try{
        const {id} = request.params
        if(!id) return response.status(200).send({ success: false, message: response_messages.s_wrong });
        const clientRole = await getRoleClient()
        const archiveClient = await UORelation.update({ status: false }, { where:{ user_id:id, role: clientRole } })
        if(archiveClient[0] == 0) return response.status(400).send({ success: false, message: response_messages.s_wrong});
        return response.status(200).send({ success: true, message: response_messages.success, response_data: archiveClient });
    }catch(err){
        return response.status(500).send({ success: false, message: err.message });
    }
}

const restoreClient = async (request, response) => {
    try{
        const {id} = request.params
        if(!id) return response.status(200).send({ success: false, message: response_messages.s_wrong });
        const clientRole = await getRoleClient()
        const restoreClient = await UORelation.update({ status: true }, { where:{ user_id:id, role: clientRole } })
        if(restoreClient[0] == 0) return response.status(400).send({ success: false, message: response_messages.s_wrong});
        return response.status(200).send({ success: true, message: response_messages.success, response_data: restoreClient });
    }catch(err){
        return response.status(500).send({ success: false, message: err.message });
    }
}

const clientArchiveList = async (request, response) => {
    try{
        const { user } = request
        let organization_id = user.organisation[0].organization_id
        const { page_number, page_size } = request.query;
        const { limit, offset } = getPagination(page_number, page_size, 10);
        const roleClient = await getRoleClient()
        const archivedClient = await UORelation.findAndCountAll({
            limit, offset,
            distinct: true,
            where : { organization_id, status:false, role: roleClient},
            include: {
                model: Users,
                where: {
                id: col('users_organizations.user_id')
                },
                attributes: ['id', 'full_name', 'email'],
                as : 'users',
                required: false
            }
        })

        if(!archivedClient) return response.status(400).send({ success: false, message: response_messages.s_wrong}); 
        return response.status(200).send({ success: true, message: response_messages.success, response_data: archivedClient});
    }catch(err){
        return response.status(500).send({ success: false, message: err.message });
    }
}
module.exports = { addClient, getClient, getClientDetail, updateClient, deleteClient, deleteMultipleClient, archiveClient, restoreClient, clientArchiveList}
