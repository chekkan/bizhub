import { inject, LogManager } from "aurelia-framework"
import moment from "moment"

@inject(LogManager)
export class DateFormatValueConverter {
    constructor(logManager) {
        this.log = logManager.getLogger("DateFormatValueConverter")
    }

    toView(value, format) {
        this.log.debug(value)
        const formatted = moment(value).format(format)
        return formatted
    }
}
