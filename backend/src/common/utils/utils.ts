export class Utils {

    public static toLocalDateForMySQL(date: Date): Date {
        // getTimezoneOffset() devuelve la diferencia con UTC en minutos
        const offsetMinutes = date.getTimezoneOffset();

        // Creamos un nuevo Date ajustando el offset
        return new Date(date.getTime() - offsetMinutes * 60 * 1000);
    }
}