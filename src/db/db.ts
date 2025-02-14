

export type DBType = {
    videos: any[],
}

const date = new Date();

export const db: DBType = {
    videos: [{
        id: 0,
        title: 'Barca - Juve',
        author: 'Champions league',
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: date.toISOString(),
        publicationDate: new Date(date.setDate(date.getDate() + 1)).toISOString(),
        availableResolutions: [
            "P144"
        ]
    }],
}

//Partial - это встроенный тип, который создает новый тип на основе типа DBType, делая все его свойства необязательными.
//Это значит, что любый свойства объекта DBType могут быть опущены.
export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) { //значит очищаем базу
        db.videos = []
        return
    }
    db.videos = dataset.videos || db.videos //заменяем старые значения новыми
}

//---Generic
export type A = {
    title: string
}
//чтобы не хардкодить string, мы можем использовать generic(обобщенный тип)
type B<T> = {
    value: T
}