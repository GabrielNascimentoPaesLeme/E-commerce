#!/bin/sh

# Verifica se o arquivo de commit foi passado como argumento
if [ -z "$1" ]; then
  echo "Erro: Nenhum arquivo de mensagem de commit fornecido."
  exit 1
fi

# O arquivo de commit, passado como parâmetro pelo hook
COMMIT_MSG_FILE=$1

# Identifica os arquivos modificados
changed_files=$(git diff --name-only --cached)

# Verifica se há alterações na pasta "front"
if echo "$changed_files" | grep -q "Front/src"; then
    # Verifica se há alterações nos componentes (jsx e css)
    if echo "$changed_files" | grep -q "Front/src/components.*\.jsx"; then
        echo "feat(front/components): Atualização em componente JSX" >> "$COMMIT_MSG_FILE"
    elif echo "$changed_files" | grep -q "Front/src/components.*\.css"; then
        echo "style(front/components): Atualização de estilo CSS nos componentes" >> "$COMMIT_MSG_FILE"

    # Verifica se há alterações nas rotas (jsx e css)
    elif echo "$changed_files" | grep -q "Front/src/routes.*\.jsx"; then
        echo "feat(front/routes): Atualização em rota JSX" >> "$COMMIT_MSG_FILE"
    elif echo "$changed_files" | grep -q "Front/src/routes.*\.css"; then
        echo "style(front/routes): Atualização de estilo CSS nas rotas" >> "$COMMIT_MSG_FILE"

    # Caso contrário, se houver alterações gerais em "front"
    else
        echo "feat(front): Atualização geral no Front-end" >> "$COMMIT_MSG_FILE"
    fi

# Verifica se há alterações na pasta "back"
elif echo "$changed_files" | grep -q "Back"; then
    echo "feat(back): Atualização geral no Back-end" >> "$COMMIT_MSG_FILE"

else
    echo "chore: Atualização geral" >> "$COMMIT_MSG_FILE"
fi
