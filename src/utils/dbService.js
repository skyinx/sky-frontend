/*
 * createDocument : create any mongoose document
 * @param  model  : mongoose model
 * @param  data   : {}
 */

import { getFilterQuery } from "./queryFilter";

const createDocument = (model, data) =>
  new Promise((resolve, reject) => {
    model.create(data, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

/*
 * updateDocument : update any existing mongoose document
 * @param  model  : mongoose model
 * @param id      : mongoose document's _id
 * @param data    : {}
 */
const updateDocument = (model, id, data) =>
  new Promise((resolve, reject) => {
    model.updateOne(
      {
        _id: id,
      },
      data,
      {
        runValidators: true,
        context: "query",
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

/*
 * deleteDocument : delete any existing mongoose document
 * @param  model  : mongoose model
 * @param  id     : mongoose document's _id
 */
const deleteDocument = (model, id) =>
  new Promise((resolve, reject) => {
    model.deleteOne(
      {
        _id: id,
      },
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });

/*
 * getAllDocuments : find all the mongoose document
 * @param  model   : mongoose model
 * @param query    : {}
 * @param options  : {}
 */
const getAllDocuments = async (model, query, options) => {
  query = await getFilterQuery(query);
  return new Promise((resolve, reject) => {
    model.paginate(query, options, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

/*
 * getSingleDocumentById : find single mongoose document
 * @param  model  : mongoose model
 * @param  id     : mongoose document's _id
 * @param  select : [] *optional
 */
const getSingleDocumentById = (model, id, select = []) =>
  new Promise((resolve, reject) => {
    model.findOne(
      {
        _id: id,
      },
      select,
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });

/*
 * softDeleteDocument : soft delete ( partially delete ) mongoose document
 * @param  model      : mongoose model
 * @param  id         : mongoose document's _id
 */
const softDeleteDocument = (model, id) =>
  new Promise(async (resolve, reject) => {
    const result = await getSingleDocumentById(model, id);
    result.deletedAt = new Date();
    result.isActive = false;
    model.updateOne(
      {
        _id: id,
      },
      result,
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });

/*
 * countDocument : count total number of records in particular model
 * @param  model : mongoose model
 * @param where  : {}
 */
const countDocument = (model, where) =>
  new Promise((resolve, reject) => {
    where.deletedAt = { $exists: false };
    model.where(where).countDocuments((err, result) => {
      if (result !== undefined) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });

/*
 * getDocumentByQuery : find document by dynamic query
 * @param  model      : mongoose model
 * @param  where      : {}
 * @param  select     : [] *optional
 */
const getDocumentByQuery = (model, where, select = [], options = {}) =>
  new Promise((resolve, reject) => {
    model.findOne(where, select, options, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

/*
 * findOneAndUpdateDocument : find existing document and update mongoose document
 * @param  model   : mongoose model
 * @param  filter  : {}
 * @param  data    : {}
 * @param  options : {} *optional
 */
const findOneAndUpdateDocument = (model, filter, data, options = {}) =>
  new Promise((resolve, reject) => {
    model.findOneAndUpdate(filter, data, options, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

/*
 * findOneAndDeleteDocument : find existing document and delete mongoose document
 * @param  model  : mongoose model
 * @param  filter  : {}
 * @param  options : {} *optional
 */
const findOneAndDeleteDocument = (model, filter, options = {}) =>
  new Promise((resolve, reject) => {
    model.findOneAndDelete(filter, options, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const convertPaginationResult = (result, pagination) => {
  try {
    let totalDocs = result[0].metadata[0] ? result[0].metadata[0].total : 0;
    let docs = result[0].data;
    let limit = pagination.limit;
    let totalPages =
      Math.ceil(totalDocs / limit) === 0 ? 1 : Math.ceil(totalDocs / limit);
    let page =
      Math.ceil(pagination.offset / limit) === 0
        ? 1
        : Math.ceil(pagination.offset / limit);
    let hasPrevPage = false;
    let prevPage = null;
    let nextPage = null;
    if (page !== 1 && page !== 0) {
      hasPrevPage = true;
      prevPage = page - 1;
    }
    let hasNextPage = false;
    if (page !== totalPages) {
      hasNextPage = true;
      nextPage = page + 1;
    }

    let responseData = {
      data: docs,
      paginator: {
        itemCount: totalDocs,
        offset: pagination.offset,
        limit: limit,
        totalPages: totalPages,
        page: page,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevPage: prevPage,
        nextPage: nextPage,
      },
    };
    return responseData;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const addDeletedAtFilter = function (schema) {
  schema.pre(
    [
      "paginate",
      "findOne",
      "find",
      "findOneAndUpdate",
      "updateMany",
      "countDocuments",
      "count",
    ],
    async function (next) {
      this.where({ deletedAt: { $exists: false } });
      next();
    }
  );
};

export {
  createDocument,
  getAllDocuments,
  updateDocument,
  deleteDocument,
  softDeleteDocument,
  getDocumentByQuery,
  countDocument,
  addDeletedAtFilter,
  findOneAndDeleteDocument,
  findOneAndUpdateDocument,
  convertPaginationResult,
};
