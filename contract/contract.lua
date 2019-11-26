function constructor(id, breed, sex, age, area, price, owner_id)
    system.setItem(id, {breed=breed, sex=sex, age=age, area=area, price=price, owner_id=owner_id})
end

function set(id, breed, sex, age, area, price, owner_id)
system.setItem(id, {breed=breed, sex=sex, age=age, area=area, price=price, owner_id=owner_id})
end
function event(id, breed, sex, age, area, price, owner_id)
contract.event("event", id, breed, sex, age, area, price, owner_id)
end

function get(id)
return system.getItem(id)
end

abi.register(set)
abi.payable(constructor)
abi.register_view(get)
