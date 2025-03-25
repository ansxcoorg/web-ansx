import { gql } from "@apollo/client";

export default class Schema {
  static branches = gql`
    query Branches($skip: Int, $limit: Int, $where: BranchWhereInput) {
      branches(skip: $skip, limit: $limit, where: $where) {
        total
        data {
          id_branch
          branch_name
          isDeleted
          mainBranches
          branch_address
          address_info
          map_lat
          map_lng
        }
      }
    }
  `;
  static slideImg = gql`
    query Query($skip: Int, $limit: Int, $where: SlideImageWhereInput) {
      slideImages(skip: $skip, limit: $limit, where: $where) {
        total
        data {
          id
          image
          isPublic
          type
          createdAt
          updatedAt
          description
        }
      }
    }
  `;
  static news = gql`
    query Query($skip: Int, $limit: Int, $where: CommunityWhereInput) {
      communities(skip: $skip, limit: $limit, where: $where) {
        total
        data {
          id
          image
          files
          description
          title
          createdBy {
            id
            firstName
            lastName
            email
          }
          subImages
          catalog {
            id
            title
            coverImage
            createdAt
            type
          }
          createdAt
        }
      }
    }
  `;

  static packagesPrice = gql`
    query Ans_category($skip: Int, $limit: Int, $where: AnsCategoryWhereInput) {
      ans_category(skip: $skip, limit: $limit, where: $where) {
        total
        data {
          _id
          icon
          isThai
          packagePrice
          providerId
          title
        }
      }
    }
  `;

  static communities = gql`
    query Communities($skip: Int, $limit: Int, $where: CommunityWhereInput) {
      communities(skip: $skip, limit: $limit, where: $where) {
        total
        data {
          id
          catalog {
            id
            title
          }
          title
          description
          image
          subImages
          videos
          files
          isVideo
          isPublic
          createdAt
          updatedAt
          createdBy {
            id
            firstName
            lastName
          }
        }
      }
    }
  `;
  static provinces = gql`
    query Query($skip: Int, $limit: Int, $where: ProvinceWhereInput) {
      provinces(skip: $skip, limit: $limit, where: $where) {
        total
        data {
          id_state
          provinceCode
          provinceName
        }
      }
    }
  `;
}
