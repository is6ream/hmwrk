

export type DBType = {
    videos: any[],
    blogs: any[]
}

export const db: DBType = {
    videos: [{ id: 1, title: 'title' },
    { id: 2, title: 'my first video' },
    {
        id: 3,
        author: "PewDiePie",
        resolution: '720'
    }],

    blogs: []
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
type A = {
    title: string
}
//чтобы не хардкодить string, мы можем использовать generic(обобщенный тип)
type B<T> = {
    value: T
}