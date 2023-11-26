import { Grid, Spinner } from '@chakra-ui/react';
import JobPostingCard from '../JobPostingCard';
import { useGetJobPostingList } from '@/hooks/api/job-posting/useGetJobPostingList';

const JobPostingList = () => {
  const { jobPostingListData } = useGetJobPostingList();

  return jobPostingListData ? (
    <Grid templateColumns="repeat(3, 1fr)" gap="32px">
      {jobPostingListData.map((jobPosting) => (
        <JobPostingCard
          title={jobPosting.title}
          imageUrl={jobPosting.imageUrl}
          companyName={jobPosting.companyName}
          detailLink={jobPosting.detailLink}
        />
      ))}
    </Grid>
  ) : (
    <Spinner color="primary" />
  );
};

export default JobPostingList;