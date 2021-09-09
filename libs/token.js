export const token = {
    create: function(type, value, children) {
        return {
            type,
            value,
            children: children ? children : []
        }
    },
    createSimple: function (type, value) {
        return {
            type,
            value
        }
    }
}