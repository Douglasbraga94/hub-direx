#!/bin/bash

echo "=== Verificando schema da tabela usuarios ==="
echo ""

docker exec -it portal-direx-backend bash -c "mysql -h 72.60.245.176 -u usr_portaldirex -p'#Usr8dbDIREX' db_portal_Direx -e 'DESCRIBE usuarios;'"

echo ""
echo "=== Verificando dados da tabela usuarios ==="
docker exec -it portal-direx-backend bash -c "mysql -h 72.60.245.176 -u usr_portaldirex -p'#Usr8dbDIREX' db_portal_Direx -e 'SELECT * FROM usuarios LIMIT 1;'"
