import { Box, Container } from '@chakra-ui/react'
import { useState } from 'react'
import { NvdCveResponse } from '@/components/capec-to-cve-components/types.tsx'
import { Capec2CWEForm } from '@/components/capec-to-cve-components/Capec2CWEForm.tsx'
import { CWE2CVEForm } from '@/components/capec-to-cve-components/CWE2CVEForm.tsx'
import { CveCardList } from '@/components/capec-to-cve-components/cve-card-list.tsx'
import {
  useCVEForm,
  useCVEMutation,
} from '@/components/capec-to-cve-components/data.ts'

export function Capec2CVEPage() {
  const [cweIds, setCWEIds] = useState<string[]>([])
  const [CVEs, setCVEs] = useState<NvdCveResponse>()
  const [page, setPage] = useState(1)

  const { register, handleSubmit, errors, setError, getValues } = useCVEForm()

  const cveMutation = useCVEMutation(setCVEs, setError)

  return (
    <Container>
      <Capec2CWEForm setCWEIds={setCWEIds} />

      <Box marginTop='12px'>
        {cweIds.map((cweId, index) => (
          <span key={cweId}>
            {cweId}
            {index !== cweIds.length - 1 && ', '}{' '}
          </span>
        ))}
      </Box>

      <CWE2CVEForm
        mutation={cveMutation}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        setCVEs={setCVEs}
      />
      <CveCardList
        page={page}
        setPage={setPage}
        getValues={getValues}
        CVEs={CVEs}
        mutation={cveMutation}
      />
    </Container>
  )
}
