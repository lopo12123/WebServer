import { RustyOption } from "./rustyjs/index"

const some = RustyOption.Some(1)
console.log(some)
console.log(some.is_some)
console.log(some.unwrap())
