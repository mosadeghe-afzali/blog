import { Sort } from "../../blog/dtos/blog-query.dto.js";

export const sortFunction = (sort: Sort) => {
    let sortObject: any = {};
    if(sort === Sort.title) {
      sortObject = {title: 1};
    } else if (sort === Sort.createdAt) {
      sortObject = {createdAt: -1};
    } else {
      sortObject = {updatedAt: -1};
    }

    return sortObject;
};