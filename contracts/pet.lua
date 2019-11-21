function constructor(id, breed, sex, age, area, price, owner_id)
  system.setItem(id, {breed=breed, sex=sex, age=age, area=area, price=price, owner_id=owner_id})
end
-- setItem : 키에 해당하는 값을 현재 계약에 속하는 스토리지에 설정

function set(id, breed, sex, age, area, price, owner_id)
  system.setItem(id, {breed=breed, sex=sex, age=age, area=area, price=price, owner_id=owner_id})
end

function event(id, breed, sex, age, area, price, owner_id)
  contract.event("event", id, breed, sex, age, area, price, owner_id)
end
-- event : 계약 결과 영수증에 남아있게 함

function get(id)
  return system.getItem(id)
end
-- getItem : 현재 계약에 속하는 스토리지의 키에 해당하는 값을 리턴

abi.register(set)
abi.payable(constructor)
abi.register_view(get)
