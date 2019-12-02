export class Task {
    constructor(
        public taskid?: Number,
        public parenttaskid?: Number,
        public projectid?: Number,
        public task?: String,
        public startdate?: Date,
        public enddate?: Date,
        public priority?: Number,
        public status?: String,
        public projectname?: String,
        public parenttaskname?: String,
        public username?: String,
        public selecteduserid?: Number,
        public userid?: Number
    ) {}
}
