const userSvcUrl = 'https://randomuser.me/api/';

const TOTAL_RESULTS = 100;
const PER_PAGE = 50;
const SEED = 'mustafa';

export class Location {
    constructor(street, city, state, postcode) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.postcode = postcode.toString();
    }

    static createLocFromObj(obj) {
        return new Location(obj.street, obj.city, obj.state, obj.postcode);
    }
}

export class User {
    constructor(id, userName, thumbnail, image, firstName, lastName, email, location, phone, cell) {
        this.id = id;
        this.userName = userName;
        this.image = image;
        this.thumbnail = thumbnail;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.location = location;
        this.phone = phone;
        this.cell = cell;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    static createFromObj(obj) {
        return new User(
            obj['login']['uuid'],
            obj['login']['username'],
            obj['picture']['thumbnail'],
            obj['picture']['large'],
            obj['name']['first'],
            obj['name']['last'],
            obj['email'],
            Location.createLocFromObj(obj['location']),
            obj['phone'],
            obj['cell'],
        );
    }
}

export class PaginationInfo {
    constructor(currentPageNo, perPage, totalResults) {
        this.currentPageNo = currentPageNo;
        this.perPage = perPage;
        this.totalResults = totalResults;
    }

    totalPages() {
        return Math.ceil(this.totalResults / this.perPage);
    }

    hasMore() {
        return (this.currentPageNo < this.totalPages());
    }

    nextPageNo() {
        return this.currentPageNo + 1;
    }

    static createPagination(currentPageNo) {
        return new PaginationInfo(currentPageNo, PER_PAGE, TOTAL_RESULTS);
    }
}


export default class UserService {

    static async getUsersData(
        pageNo,
        nationalities = ['CH', 'ES', 'FR', 'GB'],
        limit = PER_PAGE,
        fields = "id,name,email,login,picture,phone,cell,location"
    ) {
        const formattedNat = nationalities.map(x => x.toLowerCase()).join(',');
        const data = await fetch(`${userSvcUrl}?page=${pageNo}&results=${limit}&nat=${formattedNat}&inc=${fields}&seed=${SEED}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.status.toString());
                }
                return res;
            })
            .then((res) => {
                return res.json()
            });

        return {
            usersList: data['results'].map(userObj => {
                return User.createFromObj(userObj);
            }),
            paginationInfo: PaginationInfo.createPagination(data['info']['page'])
        }
    }
}