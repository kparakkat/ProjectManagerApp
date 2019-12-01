import { User } from './user';

export class Project {
    constructor(
        public projectid?: number,
        public project?: String,
        public startdate?: Date,
        public enddate?: Date,
        public priority?: number,
        public managername?: string
    ) {}
}